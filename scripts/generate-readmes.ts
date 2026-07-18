import * as path from "node:path";
import semver from "semver";
import {
  bumpLevel,
  byCodepoint,
  countBreaking,
  type Diff,
  diffManifests,
  hasNextRelease,
  listLocalStableReleases,
  manifestToMap,
  NEXT,
  readManifest,
  releasesDir,
  writeFileIfChanged,
} from "./lib.ts";

interface Baseline {
  version: string;
  label: string;
}

const cell = (value: string): string => value.replaceAll("|", "\\|");
const pkg = (name: string): string => `\`${cell(name)}\``;

function releaseType(from: string, to: string): string {
  const bump = bumpLevel(from, to);
  if (bump === undefined) return "";
  return bump.breaking ? `${bump.level} ⚠️` : bump.level;
}

function renderSection(baseline: Baseline, current: string, diff: Diff): string {
  const lines: string[] = [];
  lines.push(`## Compared to ${baseline.version} (${baseline.label})`, "");
  const bumps = [
    ...diff.majorBumps.map((bump) => ({ ...bump, major: true })),
    ...diff.otherBumps.map((bump) => ({ ...bump, major: false })),
  ].sort((a, b) => byCodepoint(a.name, b.name));
  const attention = countBreaking(diff);
  const attentionParts = [
    ...(attention.major > 0 ? [`${attention.major} major`] : []),
    ...(attention.minor > 0 ? [`${attention.minor} 0.x minor`] : []),
    ...(attention.patch > 0 ? [`${attention.patch} 0.0.x patch`] : []),
  ];
  const summary = [
    `${diff.added.length} added`,
    `${diff.removed.length} removed`,
    `${bumps.length} upgraded`,
    `${diff.unchanged} unchanged`,
  ];
  lines.push(summary.join(", ") + ".", "");
  if (attentionParts.length > 0) {
    lines.push(`⚠️ Need extra attention: ${attentionParts.join(", ")}.`, "");
  }

  if (diff.majorBumps.length > 0) {
    lines.push("### ⚠️ Major version bumps", "");
    lines.push(`| Package | ${cell(baseline.version)} | ${cell(current)} |`, "| --- | --- | --- |");
    for (const { name, from, to } of diff.majorBumps) {
      lines.push(`| ${pkg(name)} | **${cell(from)}** | **${cell(to)}** |`);
    }
    lines.push("");
  }
  if (diff.added.length > 0) {
    lines.push("### 🆕 Added packages", "");
    lines.push("| Package | Version |", "| --- | --- |");
    for (const { name, version } of diff.added) {
      lines.push(`| ${pkg(name)} | ${cell(version)} |`);
    }
    lines.push("");
  }
  if (diff.removed.length > 0) {
    lines.push("### ❌ Removed packages", "");
    lines.push("| Package | Last version |", "| --- | --- |");
    for (const { name, version } of diff.removed) {
      lines.push(`| ${pkg(name)} | ${cell(version)} |`);
    }
    lines.push("");
  }
  if (bumps.length > 0) {
    lines.push("### ⬆️ Version bumps", "");
    lines.push(`| Package | ${cell(baseline.version)} | ${cell(current)} | Type |`, "| --- | --- | --- | --- |");
    for (const { name, from, to, major } of bumps) {
      const version = (value: string): string => (major ? `**${cell(value)}**` : cell(value));
      lines.push(`| ${pkg(name)} | ${version(from)} | ${version(to)} | ${releaseType(from, to)} |`);
    }
    lines.push("");
  }
  return lines.join("\n");
}

const stableReleases = listLocalStableReleases();
const latestStable = stableReleases.at(-1);
const manifests = new Map<string, Map<string, string>>();
const releases = [...stableReleases];
if (hasNextRelease()) releases.push(NEXT);
for (const release of releases) {
  manifests.set(release, manifestToMap(readManifest(release)));
}

/** Highest stable release with the same major.minor and a lower patch than the given version. */
function previousPatch(version: string): string | undefined {
  return stableReleases
    .filter(
      (v) =>
        semver.major(v) === semver.major(version) &&
        semver.minor(v) === semver.minor(version) &&
        semver.patch(v) < semver.patch(version),
    )
    .at(-1);
}

/** Highest stable release from a lower minor (or major) line than the given version. */
function previousMinor(version: string): string | undefined {
  return stableReleases
    .filter(
      (v) =>
        semver.major(v) < semver.major(version) ||
        (semver.major(v) === semver.major(version) && semver.minor(v) < semver.minor(version)),
    )
    .at(-1);
}

for (const release of releases) {
  const lines: string[] = [];
  const baselines: Baseline[] = [];

  if (release === NEXT) {
    const nextVersion = readManifest(NEXT).releaseVersion;
    lines.push(`# Backstage Release ${nextVersion} (next)`, "");
    if (latestStable !== undefined) {
      baselines.push({ version: latestStable, label: "latest release" });
    }
  } else {
    lines.push(`# Backstage Release ${release}`, "");
    const prevPatch = previousPatch(release);
    if (prevPatch !== undefined) baselines.push({ version: prevPatch, label: "previous patch release" });
    const firstOfMinor = `${semver.major(release)}.${semver.minor(release)}.0`;
    if (semver.patch(release) > 0 && firstOfMinor !== prevPatch && stableReleases.includes(firstOfMinor)) {
      baselines.push({ version: firstOfMinor, label: "first release of this minor" });
    }
    const prevMinor = previousMinor(release);
    if (prevMinor !== undefined) baselines.push({ version: prevMinor, label: "previous minor release" });
  }

  if (baselines.length === 0) {
    lines.push("This is the first stable Backstage release — there is no previous release to compare against.", "");
  } else {
    const current = release === NEXT ? readManifest(NEXT).releaseVersion : release;
    for (const baseline of baselines) {
      lines.push(renderSection(baseline, current, diffManifests(manifests.get(baseline.version)!, manifests.get(release)!)));
    }
  }

  writeFileIfChanged(path.join(releasesDir, release, "README.md"), lines.join("\n"));
}
console.log(`Generated README.md for ${releases.length} releases`);

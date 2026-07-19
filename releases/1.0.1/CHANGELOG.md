# Backstage Release 1.0.1 changelog

Changes between 1.0.0 and 1.0.1 — 0 added, 0 removed, 1 upgraded, 131 unchanged packages.

## Summary

- [0.x patch version bumps](#0x-patch-version-bumps): 1 package

## Table of contents

- [0.x patch version bumps](#0x-patch-version-bumps)
  - [`@backstage/plugin-auth-backend` (0.12.2 → 0.12.3)](#backstageplugin-auth-backend-0122--0123)

## 0.x patch version bumps

### `@backstage/plugin-auth-backend` (0.12.2 → [0.12.3](../../changelogs/@backstage/plugin-auth-backend.md#0123))

#### 0.12.3

##### Patch Changes

- Fix migrations to do the right thing on sqlite databases, and reapply the column type fix for those who are _not_ on sqlite databases.

  Reconstruction of #10317 in the form of a patch release instead.

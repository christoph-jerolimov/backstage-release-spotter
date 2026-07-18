# Backstage Release 1.24.1 changelog

Changes between 1.24.0 and 1.24.1 — 35 changed and 0 added packages.

## Summary

- [Minor version bumps](#minor-version-bumps): 2 packages
- [Patch version bumps](#patch-version-bumps): 2 packages
- [Excluded dependency updates](#excluded-dependency-updates): 31 packages

## Table of contents

- [Minor version bumps](#minor-version-bumps)
  - [`@backstage/plugin-catalog-backend` (1.18.0 → 1.19.0)](#backstageplugin-catalog-backend-1180--1190)
  - [`@backstage/plugin-catalog-node` (1.8.0 → 1.9.0)](#backstageplugin-catalog-node-180--190)
- [Patch version bumps](#patch-version-bumps)
  - [`@backstage/plugin-catalog-backend-module-unprocessed` (0.4.0 → 0.4.1)](#backstageplugin-catalog-backend-module-unprocessed-040--041)
  - [`@backstage/plugin-permission-backend` (0.5.37 → 0.5.38)](#backstageplugin-permission-backend-0537--0538)
- [Excluded dependency updates](#excluded-dependency-updates)

## Minor version bumps

### `@backstage/plugin-catalog-backend` (1.18.0 → 1.19.0)

#### 1.19.0

##### Minor Changes

- 9c7fb30: Added the ability to inject custom permissions from modules, on `CatalogBuilder` and `CatalogPermissionExtensionPoint`

### `@backstage/plugin-catalog-node` (1.8.0 → 1.9.0)

#### 1.9.0

##### Minor Changes

- 9c7fb30: Added the ability to inject custom permissions from modules, on `CatalogBuilder` and `CatalogPermissionExtensionPoint`

## Patch version bumps

### `@backstage/plugin-catalog-backend-module-unprocessed` (0.4.0 → 0.4.1)

#### 0.4.1

##### Patch Changes

- 9c7fb30: Internal update that injects custom permissions into the catalog using its extension point

### `@backstage/plugin-permission-backend` (0.5.37 → 0.5.38)

#### 0.5.38

##### Patch Changes

- 9c7fb30: Properly forward causes of errors from upstream backends in the `PermissionIntegrationClient`

## Excluded dependency updates

- `@backstage/backend-dynamic-feature-service` (0.2.4 → 0.2.5)
- `@backstage/plugin-auth-backend` (0.22.0 → 0.22.1)
- `@backstage/plugin-auth-backend-module-aws-alb-provider` (0.1.5 → 0.1.6)
- `@backstage/plugin-auth-backend-module-oidc-provider` (0.1.4 → 0.1.5)
- `@backstage/plugin-azure-devops-backend` (0.6.0 → 0.6.1)
- `@backstage/plugin-azure-sites-backend` (0.3.0 → 0.3.1)
- `@backstage/plugin-catalog-backend-module-aws` (0.3.8 → 0.3.9)
- `@backstage/plugin-catalog-backend-module-azure` (0.1.33 → 0.1.34)
- `@backstage/plugin-catalog-backend-module-backstage-openapi` (0.1.7 → 0.1.8)
- `@backstage/plugin-catalog-backend-module-bitbucket-cloud` (0.2.0 → 0.2.1)
- `@backstage/plugin-catalog-backend-module-bitbucket-server` (0.1.27 → 0.1.28)
- `@backstage/plugin-catalog-backend-module-gcp` (0.1.14 → 0.1.15)
- `@backstage/plugin-catalog-backend-module-gerrit` (0.1.30 → 0.1.31)
- `@backstage/plugin-catalog-backend-module-github` (0.5.4 → 0.5.5)
- `@backstage/plugin-catalog-backend-module-github-org` (0.1.8 → 0.1.9)
- `@backstage/plugin-catalog-backend-module-gitlab` (0.3.11 → 0.3.12)
- `@backstage/plugin-catalog-backend-module-incremental-ingestion` (0.4.18 → 0.4.19)
- `@backstage/plugin-catalog-backend-module-ldap` (0.5.29 → 0.5.30)
- `@backstage/plugin-catalog-backend-module-msgraph` (0.5.21 → 0.5.22)
- `@backstage/plugin-catalog-backend-module-openapi` (0.1.31 → 0.1.32)
- `@backstage/plugin-catalog-backend-module-puppetdb` (0.1.19 → 0.1.20)
- `@backstage/plugin-catalog-backend-module-scaffolder-entity-model` (0.1.11 → 0.1.12)
- `@backstage/plugin-jenkins-backend` (0.4.0 → 0.4.1)
- `@backstage/plugin-kubernetes-backend` (0.16.0 → 0.16.1)
- `@backstage/plugin-lighthouse-backend` (0.4.6 → 0.4.7)
- `@backstage/plugin-linguist-backend` (0.5.11 → 0.5.12)
- `@backstage/plugin-scaffolder-backend` (1.22.0 → 1.22.1)
- `@backstage/plugin-search-backend-module-catalog` (0.1.18 → 0.1.19)
- `@backstage/plugin-search-backend-module-techdocs` (0.1.18 → 0.1.19)
- `@backstage/plugin-techdocs-backend` (1.10.0 → 1.10.1)
- `@backstage/plugin-todo-backend` (0.3.12 → 0.3.13)

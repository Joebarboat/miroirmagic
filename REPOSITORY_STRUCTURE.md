# Repository Structure & Cleanup Explanation

This repository has been consolidated from a "split" production layout into a standard, clean Statamic/Laravel structure.

## Directory Overview

- **`app/`**, **`bootstrap/`**, **`config/`**: Standard Laravel application core.
- **`content/`**: Statamic flat-file content database.
- **`resources/`**: Frontend assets, Statamic blueprints, fieldsets, and views.
- **`public/`**: The web root. All live assets have been merged here.
- **`users/`**: Statamic user accounts.

## Removed Folders & Files

The following items were found in the source but were excluded from this clean version:

| Name | Reason for Removal |
| :--- | :--- |
| `_DL/` | Non-project folder, likely containing external downloads or temporary backups. |
| `_img/` | Custom image backup directory not integrated with the Statamic asset system. |
| `signature_mail/` | External assets/signatures not required for the CMS core. |
| `core/` | The core was moved to the root to follow standard Laravel conventions. |
| `vendor/`, `node_modules/` | These contain third-party dependencies and should be reinstalled via package managers. |
| `storage/framework/*` | Cache, sessions, and compiled views are environment-specific and should be generated at runtime. |
| `used_classes_complete.txt` | A generated file likely used for CSS purging/debugging, not part of the source. |
| `google*.html` | Search engine verification files (can be re-added to `public/` if needed, but not part of the core app source). |

## Consolidation Logic

- All assets from the previous root `assets/` and `core/public/assets/` have been merged into `public/assets/`.
- The `public/index.php` has been restored to the standard Laravel version, pointing to the root `vendor` and `bootstrap` directories.

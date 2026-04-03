# Statamic Deployment Guide

This guide outlines the steps required to deploy this cleaned Statamic/Laravel project to a new environment.

## 1. Environment Setup

Copy `.env.example` to `.env` and configure your environment variables.

```bash
cp .env.example .env
```

Ensure the Following:
- `APP_URL`: Set to your production URL.
- `APP_KEY`: Generate a new one if not already present.
- `DB_*`: Configure your database connection (Statamic normally uses a flat-file database, but Laravel/Statamic requires some database configuration for certain features).

## 2. Dependency Installation

Install PHP and JavaScript dependencies.

```bash
composer install --optimize-autoloader --no-dev
npm install
npm run build
```

## 3. Storage Permissions

Statamic requires read/write access to several directories.

```bash
chmod -R 775 storage
chmod -R 775 content
chmod -R 775 users
chmod -R 775 public/assets
```

## 4. Optimization

Run the following commands to optimize your Laravel application for production.

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan statamic:stache:warm
```

## 5. Web Server Configuration

Ensure your web server (Nginx/Apache) points its document root to the `public/` directory of this project.

### Nginx Example:
```nginx
root /var/www/miroirmagic-statamic-clean/public;
index index.php;
...
location / {
    try_files $uri $uri/ /index.php?$query_string;
}
```

## 6. Statamic Specific Notes

- **Stache Cache**: Statamic uses a file-based index (the "Stache"). Ensure it has write permissions to `storage/statamic`.
- **Assets**: If using local storage, ensure `public/assets` is writeable by the web server user.

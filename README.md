<p align="center"><img src="https://statamic.com/assets/branding/Statamic-Logo+Wordmark-Rad.svg" width="400" alt="Statamic Logo" /></p>

## About Statamic

Statamic is the flat-first, Laravel + Git powered CMS designed for building beautiful, easy to manage websites.

> [!NOTE]
> This repository contains the code for a fresh Statamic project that is installed via the Statamic CLI tool.
>
> The code for the Statamic Composer package itself can be found at the [Statamic core package repository][cms-repo].


## Getting Started

This repository was repaired for local development and contains all necessary files to run the Statamic CMS on top of the Laravel framework.

### Prerequisites

- PHP ^8.2
- Composer
- Node.js & NPM

### Installation

1.  **Install PHP dependencies:**
    ```bash
    composer install
    ```

2.  **Install and Build Assets (Vite):**
    ```bash
    npm install
    ```

3.  **Setup Environment:**
    Ensure you have a `.env` file copied from `.env.example` if it doesn't already exist.
    ```bash
    php artisan key:generate
    ```

4.  **Link Storage:**
    ```bash
    php artisan storage:link
    ```

5.  **Warm the Statamic Stache:**
    ```bash
    php please stache:warm
    ```

### Local Development

To run the application locally, start the Laravel server and build your assets.

1.  **Start the server:**
    ```bash
    php artisan serve
    ```
2.  **Access the Control Panel:**
    Navigate to `http://127.0.0.1:8000/cp` and login with your credentials.

3.  **Run Vite:**
    For active development of front-end assets:
    ```bash
    npm run dev
    ```
    Or build for production:
    ```bash
    npm run build
    ```

## Important Links

- [Statamic Documentation][docs]
- [Laravel Documentation](https://laravel.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)

[docs]: https://statamic.dev/
[discord]: https://statamic.com/discord
[contribution]: https://github.com/statamic/cms/blob/master/CONTRIBUTING.md
[cms-repo]: https://github.com/statamic/cms

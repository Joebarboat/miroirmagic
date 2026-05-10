<?php
use Illuminate\Support\Facades\Route;
use Statamic\Facades\User;

// Route pour les tags
Route::statamic('blog-photobooth-miroirmagic/tags/{slug}', 'taxonomies/tags');

// Sitemap
Route::statamic('sitemap.xml', 'sitemap', ['layout' => 'sitemap', 'content_type' => 'xml']);

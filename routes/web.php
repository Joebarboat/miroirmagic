<?php

use Illuminate\Support\Facades\Route;
use Statamic\Facades\User;

// Route::statamic('example', 'example-view', [
//    'title' => 'Example'
// ]);

Route::statamic('sitemap.xml', 'sitemap', ['layout' => 'sitemap', 'content_type' => 'xml']);

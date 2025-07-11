<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MealController;
use Illuminate\Support\Facades\Route;

Route::get('dashboard', DashboardController::class)->middleware('auth')->name('dashboard');

Route::get('/private-meal-images/{filename}', [MealController::class, 'servePrivateImage']);

require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
require __DIR__.'/caregiver.php';
require __DIR__.'/guest.php';
require __DIR__.'/kitchen-partner.php';
require __DIR__.'/member.php';
require __DIR__.'/rider.php';
require __DIR__.'/settings.php';

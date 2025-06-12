<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/welcome', function () {
    return Inertia::render('welcome');
})->name('welcome');

Route::inertia('/', 'Home')->name('home');
Route::inertia('/about', 'About')->name('about');
Route::inertia('/contact', 'Contact')->name('contact');
Route::inertia('/donation','Donation')->name('donation');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::get('/delivery-tracker', function () {
    return Inertia::render('DeliveryTracker');
})->name('delivery-tracker');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

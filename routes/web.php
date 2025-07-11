<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DonationController;
use App\Http\Controllers\MealController;
use Illuminate\Support\Facades\Route;

Route::get('dashboard', DashboardController::class)->middleware('auth')->name('dashboard');

Route::post('/contact', [ContactController::class, 'store']);

Route::inertia('/', 'Home')->name('home');
Route::inertia('/about', 'About')->name('about');
Route::inertia('/contact', 'Contact')->name('contact');
Route::inertia('/donation', 'Donation')->name('donation');

Route::get('/private-meal-images/{filename}', [MealController::class, 'servePrivateImage']);

// Donation and Stripe routes
Route::post('/donations', [DonationController::class, 'store'])->name('donations.store');
Route::post('/donations/create-payment-intent', [DonationController::class, 'createPaymentIntent'])->name('donations.create-payment-intent');
Route::post('/stripe/webhook', [DonationController::class, 'handleWebhook'])->name('stripe.webhook');
Route::get('/donation/success', [DonationController::class, 'success'])->name('donation.success');

require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
require __DIR__.'/caregiver.php';
require __DIR__.'/kitchen-partner.php';
require __DIR__.'/member.php';
require __DIR__.'/rider.php';
require __DIR__.'/settings.php';

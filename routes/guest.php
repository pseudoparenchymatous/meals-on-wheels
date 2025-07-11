<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\DonationController;
use App\Http\Controllers\GuestController;

Route::get('/', [GuestController::class, 'home'])->name('home');
Route::get('/about', [GuestController::class, 'about'])->name('about');
Route::get('/contact', [GuestController::class, 'contact'])->name('contact');
Route::get('/donation', [GuestController::class, 'donation'])->name('donation');
Route::get('/donation/success', [DonationController::class, 'success'])->name('donation.success');

Route::post('/contact', [ContactController::class, 'store']);
Route::post('/donations', [DonationController::class, 'store'])->name('donations.store');
Route::post('/donations/create-payment-intent', [DonationController::class, 'createPaymentIntent'])->name('donations.create-payment-intent');
Route::post('/stripe/webhook', [DonationController::class, 'handleWebhook'])->name('stripe.webhook');

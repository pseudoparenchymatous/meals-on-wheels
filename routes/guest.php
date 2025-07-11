<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\DonationController;
use App\Http\Controllers\GuestController;

Route::controller(GuestController::class)->group(function () {
    Route::get('/', 'home')->name('home');
    Route::get('/about', 'about')->name('about');
    Route::get('/contact', 'contact')->name('contact');
    Route::get('/donation', 'donation')->name('donation');
    Route::get('/donation/success', 'success')->name('donation.success');
});

Route::post('/contact', [ContactController::class, 'store']);

Route::controller(DonationController::class)->group(function () {
    Route::post('/donations', 'store')->name('donations.store');
    Route::post('/donations/create-payment-intent', 'createPaymentIntent')->name('donations.create-payment-intent');
    Route::post('/stripe/webhook', 'handleWebhook')->name('stripe.webhook');
});

<?php

use App\Http\Controllers\CaregiverDeliveryTrackerController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DonationController;
use App\Http\Controllers\MealController;
use App\Models\Member;
use App\Models\WeeklyPlan;
use Carbon\Carbon;
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

Route::name('caregiver.')->prefix('caregiver')->middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'caregiver'])->name('dashboard');
    Route::get('/delivery-tracker', [CaregiverDeliveryTrackerController::class, 'index'])->name('delivery.tracker');
});

Route::post('/weekly-plans', function () {
    if (WeeklyPlan::all()->isEmpty()) {
        WeeklyPlan::create([
            'start_date' => Carbon::now()->startOfWeek(Carbon::MONDAY)->toDateString(),
        ]);
    } else {
        $lastWeek = WeeklyPlan::orderByDesc('start_date')->first()->start_date;
        WeeklyPlan::create([
            'start_date' => Carbon::parse($lastWeek)->addDays(7)->toDateString(),
        ]);
    }

    return to_route('admin.planning')->with(['message' => 'Plan has been created']);
})->name('weekly-plans.store');

Route::patch('/members/verify/{member}', function (Member $member) {
    $member->verified = true;
    $member->save();

    return back()->with('message', 'User has been verified successfully!');
})->name('members.verify');

require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
require __DIR__.'/member.php';
require __DIR__.'/settings.php';

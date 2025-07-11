<?php

use App\Http\Controllers\CaregiverDeliveryTrackerController;
use App\Http\Controllers\DashboardController;

Route::name('caregiver.')->prefix('caregiver')->middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'caregiver'])->name('dashboard');
    Route::get('/delivery-tracker', [CaregiverDeliveryTrackerController::class, 'index'])->name('delivery.tracker');
});
Route::name('caregiver.')->prefix('caregiver')->middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'caregiver'])->name('dashboard');
    Route::get('/delivery-tracker', [CaregiverDeliveryTrackerController::class, 'index'])->name('delivery.tracker');
});

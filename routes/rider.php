<?php

use App\Http\Controllers\RiderDashboardController;
use App\Http\Controllers\RiderDeliveryTrackerController;

Route::name('rider.')->prefix('rider')->middleware(['auth:rider'])->group(function () {
    Route::get('/dashboard', [RiderDashboardController::class, 'index'])->name('dashboard');
    Route::get('/delivery-tracker', [RiderDeliveryTrackerController::class, 'index'])->name('delivery.tracker');
    Route::get('/delivery/{id}', [RiderDeliveryTrackerController::class, 'show'])->name('delivery.show');
    Route::post('/delivery/{id}/update-status', [RiderDeliveryTrackerController::class, 'updateStatus'])->name('delivery.updateStatus');
});

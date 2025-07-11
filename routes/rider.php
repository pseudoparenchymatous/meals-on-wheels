<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\RiderDeliveryTrackerController;

Route::middleware(['auth:rider'])
    ->name('rider.')
    ->group(function () {
        Route::get('/deliveries', [RiderDeliveryTrackerController::class, 'index'])->name('deliveries');
        Route::get('/delivery/{id}', [RiderDeliveryTrackerController::class, 'show'])->name('delivery.show');
        Route::post('/delivery/{id}/update-status', [RiderDeliveryTrackerController::class, 'updateStatus'])->name('delivery.updateStatus');
    });

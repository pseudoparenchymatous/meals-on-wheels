<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DeliveryTrackerController;
use App\Http\Controllers\MemberReassessmentController;
use App\Http\Middleware\CheckMemberVerificationStatus;
use Inertia\Inertia;

Route::prefix('member')
    ->name('member.')
    ->middleware(['auth:member', CheckMemberVerificationStatus::class])
    ->group(function () {
        Route::get('dashboard', [DashboardController::class, 'member'])->name('dashboard');

        // Delivery Tracker
        Route::get('delivery-tracker', [DeliveryTrackerController::class, 'index'])->name('delivery-tracker');
        Route::post('delivery-tracker/{meal}/feedback', [DeliveryTrackerController::class, 'feedback'])->name('meal.feedback');

        // Reassessments
        Route::get('reassessments', [MemberReassessmentController::class, 'index'])->name('reassessments.index');

        Route::get('verify', function () {
            return Inertia::render('Member/Verify', [
                'verified' => auth()->user()->userable->verified,
            ]);
        })->withoutMiddleware(CheckMemberVerificationStatus::class)->name('verify.notify');
    });

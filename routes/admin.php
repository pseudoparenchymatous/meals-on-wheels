<?php

use App\Http\Controllers\AdminReassessmentController;
use App\Http\Controllers\DonationController;
use App\Http\Controllers\IngredientsController;
use App\Http\Controllers\MealAssignmentController;
use App\Http\Controllers\MealController;
use App\Http\Controllers\UserController;
use App\Models\Donation;
use App\Models\Ingredients;
use App\Models\MealAssignment;
use App\Models\Member;
use App\Models\Rider;
use App\Models\WeeklyPlan;
use Inertia\Inertia;

Route::middleware('auth:admin')
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('Admin/Dashboard', [
                'adminName' => auth()->user()->userable->first_name,
                'data' => [
                    'alerts' => Ingredients::wherePast('expiration_date')->count(),
                    'donations' => round(Donation::all()->sum('amount')),
                    'mealsDelivered' => MealAssignment::where('status', 'delivered')->count(),
                    'members' => Member::all()->count(),
                    'riders' => Rider::all()->count(),
                    'unverified' => Member::where('verified', false)->count(),
                ],
            ]);
        })->name('dashboard');

        // Reassessments
        Route::resource('reassessments', AdminReassessmentController::class);

        // Donor Management
        Route::get('/donor-management', [DonationController::class, 'manage'])->name('donor.management');
        Route::put('/donors/{donation}', [DonationController::class, 'update'])->name('donors.update');
        Route::put('/donors/{donation}/cancel', [DonationController::class, 'cancel'])->name('donors.cancel'); // Changed to PUT for consistency
        Route::delete('/donors/{donation}', [DonationController::class, 'destroy'])->name('donors.destroy');

        Route::resource('users', UserController::class);

        Route::post('meals', [MealController::class, 'store'])->name('meals.store');
        Route::get('/meals', [MealController::class, 'index'])->name('meals');
        Route::put('/meals/{id}', [MealController::class, 'update'])->name('meals.update');
        Route::delete('/meals/{meal}', [MealController::class, 'destroy'])->name('meals.destroy');

        Route::get('/meals/ingredients', [IngredientsController::class, 'index'])->name('admin.ingredients.index');
        Route::post('/meals/ingredients', [IngredientsController::class, 'store'])->name('admin.ingredients.store');
        Route::put('/meals/ingredients/{id}', [IngredientsController::class, 'update'])->name('admin.ingredients.update');
        Route::delete('/meals/ingredients/{id}', [IngredientsController::class, 'destroy'])->name('admin.ingredients.destroy');

        Route::get('planning', function () {
            return Inertia::render('Admin/Plan', [
                'weeklyPlans' => WeeklyPlan::all(),
            ]);
        })->name('planning');

        Route::resource('meal-assignments', MealAssignmentController::class);
    });

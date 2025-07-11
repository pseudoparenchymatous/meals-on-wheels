<?php

use App\Http\Controllers\AdminReassessmentController;
use App\Http\Controllers\DonationController;
use App\Http\Controllers\IngredientsController;
use App\Http\Controllers\MealAssignmentController;
use App\Http\Controllers\MealController;
use App\Http\Controllers\UserController;
use App\Models\WeeklyPlan;
use Carbon\Carbon;
use Inertia\Inertia;

Route::middleware('auth:admin')
    ->name('admin.')
    ->group(function () {
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

    });

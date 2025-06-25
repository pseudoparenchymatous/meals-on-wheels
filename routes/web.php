<?php

use App\Http\Controllers\CaregiverDashboardController;
use App\Http\Controllers\CaregiverDeliveryTrackerController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DeliveryTrackerController;
use App\Http\Controllers\DonationController;
use App\Http\Controllers\IngredientsController;
use App\Http\Controllers\MealAssignmentController;
use App\Http\Controllers\MealController;
use App\Http\Controllers\MemberDashboardController;
use App\Http\Controllers\RiderDashboardController;
use App\Http\Controllers\RiderDeliveryTrackerController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\CheckMemberVerificationStatus;
use App\Models\Donation;
use App\Models\Ingredients;
use App\Models\MealAssignment;
use App\Models\Member;
use App\Models\Rider;
use App\Models\WeeklyPlan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('dashboard', DashboardController::class)->name('dashboard');

Route::post('/contact', [ContactController::class, 'store']);

Route::inertia('/', 'Home')->name('home');
Route::inertia('/about', 'About')->name('about');
Route::inertia('/contact', 'Contact')->name('contact');
Route::inertia('/donation', 'Donation')->name('donation');
Route::inertia('/menu', 'Menu')->name('menu');

Route::post('/donations', [DonationController::class, 'store']);

Route::name('member.')->group(function () {
    Route::prefix('member')->group(function () {
        Route::middleware(['auth:member', CheckMemberVerificationStatus::class])->group(function () {
            Route::get('dashboard', [MemberDashboardController::class, 'index'])->name('dashboard');

            // Delivery Tracker
            Route::get('delivery-tracker', [DeliveryTrackerController::class, 'index'])->name('delivery-tracker');

            Route::get('verify', function () {
                return Inertia::render('Member/Verify', [
                    'verified' => auth()->user()->userable->verified,
                ]);
            })->withoutMiddleware(CheckMemberVerificationStatus::class)->name('verify.notify');
        });

    });
});

Route::name('caregiver.')->prefix('caregiver')->middleware(['auth'])->group(function () {
    Route::get('/dashboard', [CaregiverDashboardController::class, 'index'])->name('dashboard');
    Route::get('/delivery-tracker', [CaregiverDeliveryTrackerController::class, 'index'])->name('delivery.tracker');
});

Route::name('kitchen-partner.')->group(function () {
    Route::prefix('kitchen-partner')->group(function () {
        Route::middleware('auth:kitchen-partner')->group(function () {
            Route::get('dashboard', function () {
                return Inertia::render('KitchenPartner/Dashboard', [
                    'mealAssignments' => MealAssignment::all()->load([
                        'meal',
                        'rider',
                        'meal.ingredients',
                    ]),
                ]);
            })->name('dashboard');

            Route::patch('meal-assignments/{mealAssignment}', function (Request $request, MealAssignment $mealAssignment) {
                $mealAssignment->status = $request->status;
                $mealAssignment->save();

                return redirect(route('kitchen-partner.dashboard'));
            })->name('meal-assignments.update');

            Route::post('meals', [MealController::class, 'store'])->name('meals.store');
            Route::get('/meals', [MealController::class, 'index'])->name('meals');
            Route::put('/meals/{id}', [MealController::class, 'update'])->name('meals.update');
            Route::delete('/meals/{meal}', [MealController::class, 'destroy'])->name('meals.destroy');

            Route::get('/meals/ingredients', [IngredientsController::class, 'index'])->name('kitchen-partner.ingredients.index');
            Route::post('/meals/ingredients', [IngredientsController::class, 'store'])->name('kitchen-partner.ingredients.store');
            Route::put('/meals/ingredients/{id}', [IngredientsController::class, 'update'])->name('kitchen-partner.ingredients.update');
            Route::delete('/meals/ingredients/{id}', [IngredientsController::class, 'destroy'])->name('kitchen-partner.ingredients.destroy');

        });
    });
});

Route::name('rider.')->prefix('rider')->middleware(['auth:rider'])->group(function () {
    Route::get('/dashboard', [RiderDashboardController::class, 'index'])->name('dashboard');
    Route::get('/delivery-tracker', [RiderDeliveryTrackerController::class, 'index'])->name('delivery.tracker');
    Route::get('/delivery/{id}', [RiderDeliveryTrackerController::class, 'show'])->name('delivery.show');
    Route::post('/delivery/{id}/update-status', [RiderDeliveryTrackerController::class, 'updateStatus'])->name('delivery.updateStatus');
});

Route::middleware('auth:admin')->group(function () {
    Route::prefix('admin')->group(function () {
        Route::name('admin.')->group(function () {
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
    });
});

Route::post('/weekly-plans', function (Request $request) {
    WeeklyPlan::create([
        'start_date' => $request->startDate,
    ]);

    return to_route('admin.planning');
})->name('weekly-plans.store');

Route::patch('/members/verify/{member}', function (Member $member) {
    $member->verified = true;
    $member->save();

    return to_route('admin.users.index');
})->name('members.verify');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

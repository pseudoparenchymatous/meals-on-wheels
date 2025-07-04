<?php

use App\Http\Controllers\AdminReassessmentController;
use App\Http\Controllers\CaregiverDeliveryTrackerController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DeliveryTrackerController;
use App\Http\Controllers\DonationController;
use App\Http\Controllers\IngredientsController;
use App\Http\Controllers\MealAssignmentController;
use App\Http\Controllers\MealController;
use App\Http\Controllers\MemberReassessmentController;
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
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::name('caregiver.')->prefix('caregiver')->middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'caregiver'])->name('dashboard');
    Route::get('/delivery-tracker', [CaregiverDeliveryTrackerController::class, 'index'])->name('delivery.tracker');
});

Route::prefix('kitchen-partner')
    ->name('kitchen-partner.')
    ->middleware('auth:kitchen-partner')
    ->group(function () {
        Route::get('dashboard', function () {
            return Inertia::render('KitchenPartner/Dashboard', [
                'mealAssignments' => MealAssignment::all()->load([
                    'meal',
                    'rider',
                    'meal.ingredients',
                    'member',
                ]),
                'orgName' => auth()->user()->userable->org_name,
            ]);
        })->name('dashboard');

        Route::patch('meal-assignments/{mealAssignment}', function (Request $request, MealAssignment $mealAssignment) {
            $mealAssignment->status = $request->status;
            $mealAssignment->save();

            return to_route('kitchen-partner.dashboard');
        })->name('meal-assignments.update');

        Route::post('meals', [MealController::class, 'store'])->name('meals.store');
        Route::get('/meals', [MealController::class, 'index'])->name('meals');
        Route::put('/meals/{id}', [MealController::class, 'update'])->name('meals.update');
        Route::delete('/meals/{meal}', [MealController::class, 'destroy'])->name('meals.destroy');

        Route::get('/meals/ingredients', [IngredientsController::class, 'index'])->name('kitchen-partner.ingredients.index');
        Route::post('/meals/ingredients', [IngredientsController::class, 'store'])->name('kitchen-partner.ingredients.store');
        Route::put('/ingredients/{id}', [IngredientsController::class, 'update'])->name('kitchen-partner.ingredients.update');
        Route::delete('/ingredients/{id}', [IngredientsController::class, 'destroy'])->name('kitchen-partner.ingredients.destroy');
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
    });
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

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

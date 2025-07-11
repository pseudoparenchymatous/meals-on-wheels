<?php

use App\Http\Controllers\CaregiverDeliveryTrackerController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DonationController;
use App\Http\Controllers\IngredientsController;
use App\Http\Controllers\MealController;
use App\Http\Controllers\RiderDashboardController;
use App\Http\Controllers\RiderDeliveryTrackerController;
use App\Models\MealAssignment;
use App\Models\Member;
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

Route::name('caregiver.')->prefix('caregiver')->middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'caregiver'])->name('dashboard');
    Route::get('/delivery-tracker', [CaregiverDeliveryTrackerController::class, 'index'])->name('delivery.tracker');
});

Route::prefix('kitchen-partner')
    ->name('kitchen-partner.')
    ->middleware('auth:kitchen-partner')
    ->group(function () {
        Route::get('dashboard', function () {
            $user = auth()->user();
            $mealAssignments = MealAssignment::where('kitchen_partner_id', $user->userable->id)
                ->with([
                    'meal',
                    'rider',
                    'meal.ingredients',
                    'member',
                ])
                ->get();

            return Inertia::render('KitchenPartner/Dashboard', [
                'mealAssignments' => $mealAssignments,
                'orgName' => $user->userable->org_name,
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

<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\DeliveryTrackerController;
use App\Http\Controllers\DonationController;
use App\Http\Controllers\MealAssignmentController;
use App\Http\Controllers\MealController;
use App\Http\Controllers\UserController;
use App\Models\Member;
use App\Models\User;
use App\Models\WeeklyPlan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MemberDashboardController;

Route::get('dashboard', function () {
    if (!auth()->check()) {
        return redirect('home');
    }

    return match (auth()->user()->userable_type) {
        'admin' => redirect(route('admin.dashboard')),
        'member' => redirect(route('member.dashboard')),
        'kitchen partner' => redirect(route('kitchen-partner.dashboard')),
        'rider' => redirect(route('rider.dashboard')),
        default => redirect(route('home'))
    };
})->name('dashboard');

Route::post('/contact', [ContactController::class, 'store']);

Route::get('/welcome', function () {
    return Inertia::render('welcome');
})->name('welcome');

Route::inertia('/', 'Home')->name('home');
Route::inertia('/about', 'About')->name('about');
Route::inertia('/contact', 'Contact')->name('contact');
Route::inertia('/donation', 'Donation')->name('donation');
Route::inertia('/menu', 'Menu')->name('menu');

Route::post('/donations', [DonationController::class, 'store']);

Route::name('member.')->group(function () {
    Route::prefix('member')->group(function () {
        Route::middleware(['auth:member',])->group(function () {
            Route::get('dashboard', [MemberDashboardController::class, 'index'])->name('dashboard');
        });
    });

    Route::get('/verify', function () {
        return Inertia::render('Member/Verify');
    })->name('verify');
});

Route::name('kitchen-partner.')->group(function () {
    Route::prefix('kitchen-partner')->group(function () {
        Route::inertia('/dashboard', 'KitchenPartner/Dashboard')->name('dashboard');
    });
});

Route::name('rider.')->group(function () {
    Route::prefix('rider')->group(function () {
        Route::inertia('/dashboard', 'Rider/Dashboard')->name('dashboard');
    });
});

Route::middleware('auth:admin')->group(function () {
    Route::prefix('admin')->group(function () {
        Route::name('admin.')->group(function () {
            Route::get('/dashboard', function () {
                return Inertia::render('Admin/Dashboard');
            })->name('dashboard');

            Route::resource('users', UserController::class);

            Route::get('planning', function () {
                return Inertia::render('Admin/Plan', [
                    'weeklyPlans' => WeeklyPlan::all(),
                ]);
            })->name('planning');

            Route::get('/meals', [MealController::class, 'index'])->name('meals');
            Route::post('/meals', [MealController::class, 'store'])->name('meals.store');
            Route::put('/meals/{id}', [MealController::class, 'update'])->name('meals.update');
            Route::delete('/meals/{meal}', [MealController::class, 'destroy'])->name('meals.destroy');

            Route::resource('meal-assignments', MealAssignmentController::class);
        });
    });
});

Route::post('/weekly-plans', function (Request $request) {
    WeeklyPlan::create([
        'start_date' => $request->startDate
    ]);
    return to_route('admin.planning');
})->name('weekly-plans.store');

Route::middleware(['auth:member', 'verified'])->group(function () {
    Route::get('/delivery-tracker', [DeliveryTrackerController::class, 'index'])->name('delivery.tracker');
});

Route::delete('/users/{id}', function ($id) {
    User::destroy($id);
    return redirect('admin/users');
});

Route::patch('/members/verify/{member}', function(Member $member) {
    $member->verified = true;
    $member->save();
    return to_route('admin.users.index');
})->name('members.verify');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

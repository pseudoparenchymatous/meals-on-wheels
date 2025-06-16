<?php

use App\Http\Controllers\DeliveryTrackerController;
use App\Http\Controllers\MealController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ContactController;


Route::post('/contact', [ContactController::class, 'store']);

Route::get('/welcome', function () {
    return Inertia::render('welcome');
})->name('welcome');

Route::inertia('/', 'Home')->name('home');
Route::inertia('/about', 'About')->name('about');
Route::inertia('/contact', 'Contact')->name('contact');
Route::inertia('/donation', 'Donation')->name('donation');
Route::inertia('/menu', 'Menu')->name('menu');

Route::middleware(['auth:member', 'verified'])->group(function () {
    Route::inertia('/dashboard', 'Member/Dashboard')->name('member.dashboard');
});

Route::middleware('auth:admin')->group(function () {
    Route::prefix('admin')->group(function () {
        Route::name('admin.')->group(function () {
            Route::get('/dashboard', function () {
                return Inertia::render('Admin/Dashboard');
            })->name('dashboard');
        });
    });
});

Route::prefix('admin')->group(function () {
    Route::get('/meals', [MealController::class, 'index'])->name('admin.meals');
    Route::post('/meals', [MealController::class, 'store'])->name('admin.meals.store');
    Route::post('/meals/{meal}', [MealController::class, 'update'])->name('admin.meals.update');
    Route::delete('/meals/{meal}', [MealController::class, 'destroy'])->name('admin.meals.destroy');
});

Route::get('/delivery-tracker', function () {
    return Inertia::render('DeliveryTracker');
})->name('delivery-tracker');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/delivery-tracker', [DeliveryTrackerController::class, 'index'])->name('delivery.tracker');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

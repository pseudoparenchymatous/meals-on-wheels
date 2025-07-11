<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\IngredientsController;
use App\Http\Controllers\MealController;
use App\Models\MealAssignment;

Route::prefix('kitchen-partner')
    ->name('kitchen-partner.')
    ->middleware('auth:kitchen-partner')
    ->group(function () {
        Route::get('dashboard', [DashboardController::class, 'kitchenPartner'])->name('dashboard');
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

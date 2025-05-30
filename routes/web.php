<?php

use App\Livewire\About;
use Illuminate\Support\Facades\Route;
use Livewire\Volt\Volt;

Route::get('/welcome', function () {
    return view('welcome');
})->name('welcome');

Route::view('/', 'home')->name('home');
Route::get('/about', About::class)->name('about');

Route::view('dashboard', 'dashboard')
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware(['auth'])->group(function () {
    Route::redirect('settings', 'settings/profile');

    Volt::route('settings/profile', 'settings.profile')->name('settings.profile');
    Volt::route('settings/password', 'settings.password')->name('settings.password');
    Volt::route('settings/appearance', 'settings.appearance')->name('settings.appearance');
});

require __DIR__.'/auth.php';

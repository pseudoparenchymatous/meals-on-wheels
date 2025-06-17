<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Auth::viaRequest('admin', function ($request) {
            if (!auth()->check()) {
                return null;
            }

            if (Auth::user()->userable instanceof \App\Models\Admin) {
                return Auth::user();
            } else {
                return null;
            }
        });

        Auth::viaRequest('member', function ($request) {
            $user = auth()->user();
            if (!$user) {
                return null;
            }

            if ($user->userable instanceof \App\Models\Member) {
                return $user;
            } else {
                return null;
            }
        });

        Relation::enforceMorphMap([
            'admin' => 'App\Models\Admin',
            'member' => 'App\Models\Member',
            'caregiver' => 'App\Models\Caregiver',
            'volunteer' => 'App\Models\Volunteer',
            'partner' => 'App\Models\Partner',
        ]);
    }
}

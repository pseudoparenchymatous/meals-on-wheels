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

        Auth::viaRequest('kitchen-partner', function () {
            if (!auth()->check()) {
                return null;
            }

            if (auth()->user()->userable_type == 'kitchen partner') {
                return auth()->user();
            }

            return null;
        });

        Auth::viaRequest('member', function ($request) {
            if (!auth()->check()) {
                return null;
            }

            if (auth()->user()->userable_type == 'member') {
                return Auth::user();
            } else {
                return null;
            }
        });

        Relation::enforceMorphMap([
            'admin' => 'App\Models\Admin',
            'member' => 'App\Models\Member',
            'caregiver' => 'App\Models\Caregiver',
            'rider' => 'App\Models\Rider',
            'kitchen partner' => 'App\Models\KitchenPartner',
        ]);
    }
}

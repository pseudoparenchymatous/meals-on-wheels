<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        if (! auth()->check()) {
            return redirect(route('login'));
        }

        return match (auth()->user()->userable_type) {
            'admin' => redirect(route('admin.dashboard')),
            'member' => redirect(route('member.dashboard')),
            'kitchen partner' => redirect(route('kitchen-partner.dashboard')),
            'rider' => redirect(route('rider.dashboard')),
            'caregiver' => redirect(route('caregiver.dashboard')),
            default => redirect(route('home'))
        };
    }
}

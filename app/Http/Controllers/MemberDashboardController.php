<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MemberDashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $member = $user->userable; // Get related member (or caregiver, etc.)

        return Inertia::render('Member/Dashboard', [
            'auth' => [
                'user' => $user,
                'member' => $member,
            ]
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class CaregiverDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Caregiver/Dashboard');
    }
}

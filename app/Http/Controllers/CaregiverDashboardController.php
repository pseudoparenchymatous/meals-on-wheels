<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class CaregiverDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Caregiver/Dashboard');
    }
}

<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class RiderDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Rider/Dashboard');
    }
}

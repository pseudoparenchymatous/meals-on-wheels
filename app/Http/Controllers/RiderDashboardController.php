<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\MealAssignment;

class RiderDashboardController extends Controller
{
    public function index()
    {
        $rider = Auth::user();

        $assignment = MealAssignment::with(['meal', 'member'])
            ->where('rider_id', $rider->userable->id)
            ->where('status', 'assigned')
            ->latest()
            ->first();

        return Inertia::render('Rider/Dashboard', [
            'assignedMeal' => $assignment ? [
                'id' => $assignment->id,
                'meal_name' => $assignment->meal->name ?? 'N/A',
                'member_name' => $assignment->member->first_name . ' ' . $assignment->member->last_name,
                'member_address' => $assignment->member->address,
                'status' => $assignment->status,
            ] : null,
            'googleMapsApiKey' => env('VITE_GOOGLE_MAPS_API_KEY'),
        ]);
    }
}

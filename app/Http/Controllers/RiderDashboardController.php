<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\MealAssignment;
use Inertia\Inertia;

class RiderDashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $rider = $user->userable;

        $fullName = $rider->first_name . ' ' . $rider->last_name;
        $today = now()->toDateString();

        // Get today's delivered meals
        $deliveredMeals = MealAssignment::where('rider_id', $rider->id)
            ->whereDate('updated_at', $today)
            ->where('status', 'delivered')
            ->get();

        // Calculate average delivery time in minutes
        $averageDeliveryTime = $deliveredMeals->isNotEmpty()
            ? round(
                $deliveredMeals->avg(function ($meal) {
                    return $meal->created_at->diffInMinutes($meal->updated_at);
                })
            ) . ' mins'
            : 'N/A';

        return Inertia::render('Rider/Dashboard', [
            'riderName' => $fullName,
            'todaysDeliveries' => $deliveredMeals->count(),
            'pendingOrders' => MealAssignment::where('rider_id', $rider->id)
                ->where('status', 'pending')
                ->count(),
            'averageDeliveryTime' => $averageDeliveryTime,
        ]);
    }
}

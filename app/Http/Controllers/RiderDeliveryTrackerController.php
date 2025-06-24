<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\MealAssignment;
use Inertia\Inertia;

class RiderDeliveryTrackerController extends Controller
{
    public function index()
    {
        $rider = Auth::guard('rider')->user()->userable;
        
        $deliveries = MealAssignment::with(['meal', 'kitchenPartner', 'member', 'weeklyPlan'])
            ->where('rider_id', $rider->id)
            ->orderByDesc('created_at')
            ->get()
            ->map(function ($assignment) {
                return [
                    'id' => $assignment->id,
                    'status' => $assignment->status,
                    'day' => ucfirst($assignment->day),
                    'week' => $assignment->weeklyPlan->id ?? 'N/A',
                    'meal' => [
                        'name' => $assignment->meal->name ?? 'Unknown',
                    ],
                    'kitchen_partner' => $assignment->kitchenPartner->org_name ?? 'N/A',
                    'member' => $assignment->member
                        ? "{$assignment->member->first_name} {$assignment->member->last_name}"
                        : 'Unassigned',
                ];
            });

        return Inertia::render('Rider/DeliveryTracker', [
            'deliveries' => $deliveries,
        ]);
    }
}

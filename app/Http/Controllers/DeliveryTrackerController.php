<?php

namespace App\Http\Controllers;

use App\Models\MealAssignment;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DeliveryTrackerController extends Controller
{
    public function index()
    {
        $member = Auth::user()->userable;

        $deliveries = MealAssignment::with(['meal', 'kitchenPartner', 'rider', 'weeklyPlan'])
            ->where('member_id', $member->id)
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
                    'rider' => $assignment->rider
                        ? "{$assignment->rider->first_name} {$assignment->rider->last_name}"
                        : 'Unassigned',
                ];
            });

        return Inertia::render('DeliveryTracker', [
            'deliveries' => $deliveries,
        ]);
    }
}
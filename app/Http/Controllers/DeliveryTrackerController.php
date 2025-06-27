<?php

namespace App\Http\Controllers;

use App\Models\MealAssignment;
use Inertia\Inertia;

class DeliveryTrackerController extends Controller
{
    public function index()
    {
        $member = auth()->user()->userable;

        $deliveries = MealAssignment::with(['meal', 'kitchenPartner', 'rider', 'weeklyPlan'])
            ->where('member_id', $member->id)
            ->orderByDesc('created_at')
            ->get()
            ->map(function ($assignment) {
                return [
                    'id' => $assignment->id,
                    'day' => ucfirst($assignment->day),
                    'kitchen_partner' => $assignment->kitchenPartner->org_name,
                    'meal' => $assignment->meal->name,
                    'rider' => "{$assignment->rider->first_name} {$assignment->rider->last_name}",
                    'status' => $assignment->status,
                    'temperature' => $assignment->temperature,
                    'week' => $assignment->weeklyPlan->id,
                ];
            });

        return Inertia::render('Member/DeliveryTracker', [
            'deliveries' => $deliveries,
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\MealAssignment;
use Inertia\Inertia;

class CaregiverDeliveryTrackerController extends Controller
{
    public function index()
    {
        $caregiver = Auth::user()->userable;

        $memberIds = $caregiver->members->pluck('id');

        $deliveries = MealAssignment::with(['meal', 'kitchenPartner', 'rider', 'weeklyPlan', 'member'])
            ->whereIn('member_id', $memberIds)
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
                    'member' => $assignment->member
                        ? "{$assignment->member->first_name} {$assignment->member->last_name}"
                        : 'Unknown',
                ];
            });

        return Inertia::render('Caregiver/DeliveryTracker', [
            'deliveries' => $deliveries,
        ]);
    }
}

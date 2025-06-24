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
        $member = Auth::user()->userable->member;

        return Inertia::render('Caregiver/DeliveryTracker', [
            'deliveries' => $member->mealAssignments->load([
                'meal',
                'kitchenPartner',
                'rider',
                'weeklyPlan'
            ]),
        ]);
    }
}

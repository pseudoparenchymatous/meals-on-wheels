<?php

namespace App\Http\Controllers;

use App\Models\KitchenPartner;
use App\Models\Meal;
use App\Models\MealAssignment;
use App\Models\Member;
use App\Models\Rider;
use App\Models\WeeklyPlan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class MealAssignmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/MealAssignments', [
            'mealAssignments' => MealAssignment::all()->load([
                'kitchenPartner',
                'meal.ingredients',
                'meal',
                'member',
                'rider',
                'weeklyPlan',
            ]),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/AssignMeal', [
            'kitchenPartners' => KitchenPartner::with('meals')->get(),
            'meals' => Meal::all(),
            'members' => Member::with('mealAssignments')
                ->get()
                ->map(function ($member) {
                    return [
                        'id' => $member->id,
                        'name' => "{$member->first_name} {$member->last_name}",
                        'diet' => $member->diet,
                        'mealAssignments' => $member->mealAssignments,
                    ];
            }),
            'riders' => Rider::all(),
            'weeklyPlans' => WeeklyPlan::all(),
        ]);
    }

    public function store(Request $request)
    {
        Validator::make($request->all(),
            [
                'day' => 'required',
                'kitchenPartnerId' => 'required',
                'mealId' => 'required',
                'memberId' => 'required',
                'riderId' => 'required',
                'weeklyPlanId' => 'required',
            ],
            [
                'day.required' => 'Please select which day',
                'kitchenPartnerId' => 'Please select a kitchen partner',
                'mealId' => 'Please select a meal',
                'memberId' => 'Please select a member',
                'riderId' => 'Please select a rider',
                'weeklyPlanId' => 'Please select a week',
            ])->validate();

        $memberUser = Member::find($request->memberId)->user;
        $kitchenUser = KitchenPartner::find($request->kitchenPartnerId)->user;

        MealAssignment::create([
            'day' => $request->day,
            'kitchen_partner_id' => $request->kitchenPartnerId,
            'meal_id' => $request->mealId,
            'member_id' => $request->memberId,
            'rider_id' => $request->riderId,
            'temperature' => $this->isWithin10Km(
                $kitchenUser->location_lat,
                $kitchenUser->location_lng,
                $memberUser->location_lat,
                $memberUser->location_lng,
            ) ? 'hot' : 'frozen',
            'weekly_plan_id' => $request->weeklyPlanId,
        ]);

        return to_route('admin.meal-assignments.index')->with('message', 'Meal assigned successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(MealAssignment $mealAssignment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MealAssignment $mealAssignment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MealAssignment $mealAssignment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MealAssignment $mealAssignment)
    {
        //
    }

    public function isWithin10Km($lat1, $lon1, $lat2, $lon2)
    {
        // Earth's radius in kilometers
        $earthRadius = 6371;

        // Convert degrees to radians
        $lat1 = deg2rad($lat1);
        $lon1 = deg2rad($lon1);
        $lat2 = deg2rad($lat2);
        $lon2 = deg2rad($lon2);

        // Haversine formula
        $dLat = $lat2 - $lat1;
        $dLon = $lon2 - $lon1;

        $a = sin($dLat / 2) * sin($dLat / 2) +
            cos($lat1) * cos($lat2) *
            sin($dLon / 2) * sin($dLon / 2);

        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));
        $distance = $earthRadius * $c;

        return $distance <= 10;
    }
}

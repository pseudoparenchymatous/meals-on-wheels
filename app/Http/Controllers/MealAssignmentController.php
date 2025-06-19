<?php

namespace App\Http\Controllers;

use App\Models\KitchenPartner;
use App\Models\Meal;
use App\Models\MealAssignment;
use App\Models\Member;
use App\Models\Rider;
use App\Models\WeeklyPlan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MealAssignmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function create()
    {
        return Inertia::render('Admin/AssignMeal', [
            'kitchenPartners' => KitchenPartner::all(),
            'meals' => Meal::all(),
            'members' => Member::all(),
            'riders' => Rider::all(),
            'weeklyPlans' => WeeklyPlan::all(),
        ]);
    }

    public function store(Request $request)
    {
        MealAssignment::create([
            'day' => $request->day,
            'kitchen_partner_id' => $request->kitchenPartnerId,
            'meal_id' => $request->mealId,
            'member_id' => $request->memberId,
            'rider_id' => $request->riderId,
            'weekly_plan_id' => $request->weeklyPlanId,
        ]);

        return redirect()->back()->with('message', 'Meal assignment created successfully!');
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
}

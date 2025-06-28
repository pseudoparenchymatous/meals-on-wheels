<?php

namespace App\Http\Controllers;

use App\Models\MealAssignment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        if (! auth()->check()) {
            return redirect(route('login'));
        }

        return match (auth()->user()->userable_type) {
            'admin' => redirect(route('admin.dashboard')),
            'member' => redirect(route('member.dashboard')),
            'kitchen partner' => redirect(route('kitchen-partner.dashboard')),
            'rider' => redirect(route('rider.dashboard')),
            'caregiver' => redirect(route('caregiver.dashboard')),
            default => redirect(route('home'))
        };
    }

    public function member()
    {
        $member = auth()->user()->userable;

        // Fetch meals assigned to this member
        $mealAssignments = MealAssignment::with('meal')
            ->where('member_id', $member->id)
            ->orderBy('day')
            ->get();

        // Transform the assigned meals
        $meals = $mealAssignments->map(function ($assignment) {
            $meal = $assignment->meal;

            return [
                'id' => $meal->id,
                'name' => $meal->name,
                'image_path' => $meal->image_path
                    ? url('private-meal-images/'.basename($meal->image_path))
                    : null,
            ];
        });

        return Inertia::render('Member/Dashboard', [
            'auth' => [
                'user' => auth()->user(),
                'member' => $member,
            ],
            'meals' => $meals,
        ]);
    }
}

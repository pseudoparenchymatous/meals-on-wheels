<?php

namespace App\Http\Controllers;

use App\Models\MealAssignment;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MemberDashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $member = $user->userable;

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
                'image' => $meal->image_path
                    ? asset('images/' . $meal->image_path)
                    : null,
            ];
        });

        return Inertia::render('Member/Dashboard', [
            'auth' => [
                'user' => $user,
                'member' => $member,
            ],
            'meals' => $meals,
        ]);
    }
}

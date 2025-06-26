<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\MealAssignment;

class MemberDashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $member = $user->userable;

        // Fetch meals assigned to this member
        $mealAssignments = MealAssignment::with('meal')
            ->where('member_id', $member->id)
            ->orderBy('day') // optional: to keep them sorted by day
            ->get();

        // Transform the assigned meals
        $meals = $mealAssignments->map(function ($assignment) {
            $meal = $assignment->meal;

            return [
                'id' => $meal->id,
                'name' => $meal->name,
                'image' => $meal->image_path
                    ? asset('storage/' . $meal->image_path)
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

<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use App\Models\Ingredients;
use App\Models\MealAssignment;
use App\Models\Member;
use App\Models\Rider;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        return match (auth()->user()->userable_type) {
            'admin' => redirect(route('admin.dashboard')),
            'member' => redirect(route('member.dashboard')),
            'kitchen partner' => redirect(route('kitchen-partner.dashboard')),
            'rider' => redirect(route('rider.dashboard')),
            'caregiver' => redirect(route('caregiver.dashboard')),
            default => redirect(route('home'))
        };
    }

    public function admin()
    {
        return Inertia::render('Admin/Dashboard', [
            'adminName' => auth()->user()->userable->first_name,
            'data' => [
                'alerts' => Ingredients::wherePast('expiration_date')->count(),
                'donations' => round(Donation::all()->sum('amount')),
                'mealsDelivered' => MealAssignment::where('status', 'delivered')->count(),
                'members' => Member::all()->count(),
                'riders' => Rider::all()->count(),
                'unverified' => Member::where('verified', false)->count(),
            ],
        ]);
    }

    public function caregiver()
    {
        $member = auth()->user()->userable->member;

        return Inertia::render('Caregiver/Dashboard', [
            'memberData' => [
                'fullName' => "{$member->first_name} {$member->last_name}",
                'age' => Carbon::now()->year - Carbon::parse($member->birth_date)->year,
                'diet' => $member->diet,
            ],
        ]);
    }

    public function kitchenPartner()
    {
        $user = auth()->user();
        $mealAssignments = MealAssignment::where('kitchen_partner_id', $user->userable->id)
            ->with([
                'meal',
                'rider',
                'meal.ingredients',
                'member',
            ])
            ->get();

        return Inertia::render('KitchenPartner/Dashboard', [
            'mealAssignments' => $mealAssignments,
            'orgName' => $user->userable->org_name,
        ]);
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
            'memberName' => auth()->user()->userable->first_name,
            'meals' => $meals,
        ]);
    }
}

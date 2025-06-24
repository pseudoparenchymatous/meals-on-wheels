<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Models\Meal; // make sure to import the Meal model

class MemberDashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $member = $user->userable;

        //  Get all meals from the database
        $meals = Meal::latest()->get()->map(function ($meal) {
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
            'meals' => $meals, // send meals to React
        ]);
    }
}

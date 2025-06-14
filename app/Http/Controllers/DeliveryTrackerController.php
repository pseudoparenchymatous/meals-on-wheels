<?php

namespace App\Http\Controllers;

use App\Models\MealDelivery;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DeliveryTrackerController extends Controller
{
    public function index()
    {
        $member = Auth::user()->userable;

        $deliveries = MealDelivery::with('meal')
            ->where('member_id', $member->id)
            ->orderByDesc('scheduled_time')
            ->get();

        return Inertia::render('DeliveryTracker', [
            'deliveries' => $deliveries
        ]);
    }
}
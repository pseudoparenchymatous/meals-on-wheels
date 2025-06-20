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
            ->orderByDesc('scheduled_at') // corrected column name
            ->get()
            ->map(function ($delivery) {
                return [
                    'id' => $delivery->id,
                    'status' => $delivery->status,
                    'scheduled_time' => optional($delivery->scheduled_at)->toDateTimeString(),
                    'delivered_time' => optional($delivery->delivered_at)->toDateTimeString(),
                    'meal' => [
                        'title' => $delivery->meal->name ?? 'Unknown',
                    ],
                ];
            });

        return Inertia::render('DeliveryTracker', [
            'deliveries' => $deliveries,
        ]);
    }

}

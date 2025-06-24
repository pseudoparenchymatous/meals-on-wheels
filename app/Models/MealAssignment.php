<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MealAssignment extends Model
{
    protected $fillable = [
        'day',
        'status',
        'kitchen_partner_id',
        'meal_id',
        'member_id',
        'rider_id',
        'temperature',
        'weekly_plan_id',
    ];

    public function meal(): BelongsTo
    {
        return $this->belongsTo(Meal::class);
    }

    public function member(): BelongsTo
    {
        return $this->belongsTo(Member::class);
    }

    public function weeklyPlan(): BelongsTo
    {
        return $this->belongsTo(WeeklyPlan::class);
    }

    public function kitchenPartner(): BelongsTo
    {
        return $this->belongsTo(KitchenPartner::class);
    }

    public function rider(): BelongsTo
    {
        return $this->belongsTo(Rider::class);
    }
}

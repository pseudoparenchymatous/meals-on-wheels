<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MealAssignment extends Model
{
    protected $fillable = [
        'day',
        'kitchen_partner_id',
        'meal_id',
        'member_id',
        'rider_id',
        'weekly_plan_id',
    ];
}

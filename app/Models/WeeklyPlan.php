<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WeeklyPlan extends Model
{
    protected $fillable = [
        'start_date',
    ];

    public function mealAssignments()
    {
        return $this->hasMany(MealAssignment::class);
    }
}

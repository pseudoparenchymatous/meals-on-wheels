<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Ingredient;

class Meal extends Model
{
    protected $fillable = ['name', 'meal_tag', 'prepared_by', 'preparation_time', 'image_path'];

    public function mealAssignments()
    {
        return $this->hasMany(MealAssignment::class);
    }
    public function ingredients()
    {
        return $this->hasMany(Ingredients::class);
    }
}

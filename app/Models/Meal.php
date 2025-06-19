<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Meal extends Model
{
    protected $fillable = ['name', 'meal_tag', 'prepared_by', 'preparation_time', 'image_path'];
}

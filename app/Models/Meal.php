<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Meal extends Model
{
    protected $fillable = ['title', 'meal_type', 'prepared_by', 'preparation_time', 'image_path'];
}

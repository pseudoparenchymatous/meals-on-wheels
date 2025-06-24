<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ingredients extends Model
{
    protected $fillable = ['ing_name', 'ing_type', 'unit', 'date_arrive', 'expiration_date'];

    public function meal()
    {
        return $this->belongsTo(Meal::class);
    }
}
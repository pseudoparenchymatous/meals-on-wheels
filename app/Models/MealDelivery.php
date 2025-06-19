<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MealDelivery extends Model
{
    protected $fillable = [
        'meal_id',
        'member_id',
        'rider_id',
        'status',
        'scheduled_at',
        'delivered_at',
    ];

    public function meal()
    {
        return $this->belongsTo(Meal::class);
    }

    public function member()
    {
        return $this->belongsTo(Member::class);
    }

    public function rider()
    {
        return $this->belongsTo(Rider::class);
    }
}

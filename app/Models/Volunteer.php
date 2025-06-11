<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Volunteer extends Model
{
    protected $fillable = [
        'user_id',
        'service',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

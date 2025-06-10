<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    protected $fillable = [
        'user_id',
        'diet',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

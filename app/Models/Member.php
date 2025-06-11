<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    protected $fillable = [
        'user_id',
        'birth_date',
        'diet',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

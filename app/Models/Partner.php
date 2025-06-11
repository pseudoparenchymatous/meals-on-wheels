<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Partner extends Model
{
    protected $fillable = [
        'user_id',
        'org_name',
        'service',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

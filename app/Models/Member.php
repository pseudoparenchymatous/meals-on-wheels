<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Member extends Model
{
    protected $fillable = [
        'birth_date',
        'proof_of_identity',
        'medical_condition',
        'diet',
    ];

    public function user(): MorphOne
    {
        return $this->morphOne(User::class, 'userable');
    }
}

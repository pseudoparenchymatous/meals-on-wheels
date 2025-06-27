<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Member extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'birth_date',
        'proof_of_identity',
        'medical_condition',
        'diet',
    ];

    public function user(): MorphOne
    {
        return $this->morphOne(User::class, 'userable');
    }

    public function mealAssignments(): HasMany
    {
        return $this->hasMany(MealAssignment::class);
    }

    public function reassessments()
    {
        return $this->hasMany(Reassessment::class);
    }
}

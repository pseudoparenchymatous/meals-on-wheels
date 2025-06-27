<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Reassessment extends Model
{
    use HasFactory;

    protected $fillable = [
        'member_id',
        'date',
        'notes',
    ];

    public function member()
    {
        return $this->belongsTo(Member::class);
    }
}

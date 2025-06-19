<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ingredients extends Model
{
    protected $fillable = ['ing_name', 'ing_type', 'stocks', 'date_arrive', 'expiration_date'];
}

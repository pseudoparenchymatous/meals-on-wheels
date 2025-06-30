<?php

namespace App;

enum MemberDiet: string
{
    case Vegetarian = 'Vegetarian';
    case Vegan = 'Vegan';
    case Halal = 'Halal';
    case LactoseIntolerant = 'Lactose Intolerant';
    case Diabetic = 'Diabetic';


    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}

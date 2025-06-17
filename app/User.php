<?php

namespace App;

enum User: string
{
    case Member = 'member';
    case Caregiver = 'caregiver';
    case Partner = 'partner';
    case Volunteer = 'volunteer';
    case Admin = 'admin';
}

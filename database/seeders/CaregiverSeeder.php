<?php

namespace Database\Seeders;

use App\Models\Caregiver;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CaregiverSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $caregivers = Caregiver::factory()->count(20)->create();

        $caregivers->each(function ($caregiver) {
            User::factory()->for($caregiver, 'userable')->create();
        });
    }
}

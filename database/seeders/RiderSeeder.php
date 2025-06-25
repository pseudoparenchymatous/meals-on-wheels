<?php

namespace Database\Seeders;

use App\Models\Rider;
use App\Models\User;
use Illuminate\Database\Seeder;

class RiderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $riders = Rider::factory()->count(38)->create();

        $riders->each(function ($rider) {
            User::factory()->for($rider, 'userable')->create();
        });
    }
}

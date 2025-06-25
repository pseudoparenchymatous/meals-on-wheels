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
        User::factory()->for(
            Rider::factory(), 'userable'
        )->create();
    }
}

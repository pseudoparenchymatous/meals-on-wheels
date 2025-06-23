<?php

namespace Database\Seeders;

use App\Models\Member;
use App\Models\User;
use Illuminate\Database\Seeder;

class MemberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($x = 0; $x < 10; $x++) {
            User::factory()->for(
                Member::factory(), 'userable'
            )->create();
        }
    }
}

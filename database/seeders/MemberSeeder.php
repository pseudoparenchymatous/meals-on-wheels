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
        $members = Member::factory()->count(231)->create();

        $members->each(function ($member) {
            User::factory()->for($member, 'userable')->create();
        });
    }
}

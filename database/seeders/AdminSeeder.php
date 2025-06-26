<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admins = Admin::factory()->count(12)->create();

        $admins->each(function ($admin) {
            User::factory()->for($admin, 'userable')->create();
        });
    }
}

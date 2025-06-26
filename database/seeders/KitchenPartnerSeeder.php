<?php

namespace Database\Seeders;

use App\Models\KitchenPartner;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KitchenPartnerSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $partners = KitchenPartner::factory()->count(23)->create();

        $partners->each(function ($partner) {
            User::factory()->for($partner, 'userable')->create();
        });
    }
}

<?php

namespace Database\Factories;

use App\MemberDiet;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Member>
 */
class MemberFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $hasDiet = rand(0, 1) == 1;
        $diets = MemberDiet::values();

        return [
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'birth_date' => fake()->date(),
            'proof_of_identity' => 'proofs/sample.png',
            'medical_condition' => 'medicals/sample.png',
            'diet' => $hasDiet ? $diets[array_rand($diets)] : null,
        ];
    }
}

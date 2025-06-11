<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    protected static ?string $password;

    public function definition(): array
    {
        $userType = $this->faker->randomElement(['member', 'caregiver', 'partner', 'volunteer', 'donor']);

        return [
            'first_name' => $this->faker->name(),
            'last_name' => $this->faker->firstName(),
            'email' => $this->faker->unique()->safeEmail(),
            'password' => static::$password ??= Hash::make('password'),
            'user_type' => $userType,
            'phone' => $this->faker->phoneNumber(),
            'address' => $this->faker->address(),
            'birth_date' => $this->faker->dateTimeBetween('-60 years', '-18 years')->format('Y-m-d'),
            'emergency_contact' => $this->faker->name() . ' - ' . $this->faker->phoneNumber(),
            'dietary_requirements' => $userType === 'member' ? $this->faker->words(3, true) : null,
            'medical_conditions' => $userType === 'member' ? $this->faker->sentence() : null,
            'status' => 'active',
            'email_verification_token' => null,
            'email_verified_at' => now(),
            'password_reset_token' => null,
            'password_reset_expires_at' => null,
            'remember_token' => Str::random(10),
        ];
    }

    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}

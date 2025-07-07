<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    protected static ?string $password = '12345678';

    public function definition(): array
    {
        return [
            'email' => $this->faker->unique()->email(),
            'password' => static::$password ??= Hash::make('password'),
            'phone' => fake('en_PH')->mobileNumber(),
            'location_lat' => $this->faker->latitude(10.227136, 10.483014),
            'location_lng' => $this->faker->longitude(123.766244, 124.023574),
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

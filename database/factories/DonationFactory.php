<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Carbon\Carbon;

/**
 * @extends Factory<\App\Models\Donation>
 */
class DonationFactory extends Factory
{
    public function definition(): array
    {
        $isRecurring = $this->faker->boolean(40); // 40% chance recurring
        $paymentMethod = $this->faker->randomElement(['stripe', 'paypal']);
        $now = Carbon::now();

        return [
            'donor_name' => $this->faker->name,
            'donor_email' => $this->faker->unique()->safeEmail,
            'donor_message' => $this->faker->optional()->sentence,
            'is_anonymous' => $this->faker->boolean(20),

            'amount' => $this->faker->randomFloat(2, 5, 500),
            'currency' => 'USD',
            'donation_type' => $isRecurring ? 'recurring' : 'one_time',
            'frequency' => $isRecurring ? $this->faker->randomElement(['monthly', 'quarterly', 'yearly']) : null,

            'payment_method' => $paymentMethod,
            'status' => $this->faker->randomElement(['pending', 'completed', 'failed', 'cancelled', 'refunded']),
            'payment_intent_id' => $paymentMethod === 'stripe' ? 'pi_' . Str::random(14) : null,
            'transaction_id' => 'txn_' . Str::random(14),
            'subscription_id' => $isRecurring ? 'sub_' . Str::random(14) : null,

            'paypal_payment_id' => $paymentMethod === 'paypal' ? 'PAY-' . Str::random(10) : null,
            'paypal_payer_id' => $paymentMethod === 'paypal' ? Str::random(13) : null,

            'payment_details' => json_encode(['platform' => $this->faker->randomElement(['web', 'mobile'])]),
            'payment_metadata' => json_encode(['ip' => $this->faker->ipv4]),
            'payment_date' => $now->copy()->subDays(rand(0, 30)),
            'next_payment_date' => $isRecurring ? $now->copy()->addDays(rand(30, 365)) : null,
            'cancelled_at' => null,

            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}

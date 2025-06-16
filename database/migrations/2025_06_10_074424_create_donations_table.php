<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('donations', function (Blueprint $table) {
            $table->id();

            // Donor Information
            $table->string('donor_name');
            $table->string('donor_email');
            $table->text('donor_message')->nullable();
            $table->boolean('is_anonymous')->default(false);

            // Donation Details
            $table->decimal('amount', 10, 2); // Up to 99,999,999.99
            $table->string('currency', 3)->default('USD');
            $table->enum('donation_type', ['one_time', 'recurring']);
            $table->enum('frequency', ['monthly', 'quarterly', 'yearly'])->nullable();

            // Payment Information
            $table->enum('payment_method', ['stripe', 'paypal']);
            $table->enum('status', ['pending', 'completed', 'failed', 'cancelled', 'refunded'])->default('pending');
            $table->string('payment_intent_id')->nullable(); // Stripe payment intent ID
            $table->string('transaction_id')->nullable(); // PayPal transaction ID or Stripe charge ID
            $table->string('subscription_id')->nullable(); // For recurring donations

            // PayPal specific fields
            $table->string('paypal_payment_id')->nullable();
            $table->string('paypal_payer_id')->nullable();
            $table->json('payment_details')->nullable(); // Store additional payment info

            // Metadata
            $table->json('payment_metadata')->nullable(); // Store additional payment processor data
            $table->timestamp('payment_date')->nullable();
            $table->timestamp('next_payment_date')->nullable(); // For recurring donations
            $table->timestamp('cancelled_at')->nullable();

            $table->timestamps();

            // Indexes
            $table->index(['donor_email', 'created_at']);
            $table->index(['status', 'payment_date']);
            $table->index(['donation_type', 'frequency']);
            $table->index('payment_intent_id');
            $table->index('transaction_id');
            $table->index('subscription_id');
            $table->index('paypal_payment_id');
            $table->index('paypal_payer_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('donations');
    }
};

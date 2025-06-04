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
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->string('donor_name');
            $table->string('donor_email');
            $table->decimal('amount', 10, 2);
            $table->string('currency', 3)->default('USD');
            $table->enum('donation_type', ['one_time', 'recurring'])->default('one_time');
            $table->enum('frequency', ['monthly', 'quarterly', 'yearly'])->nullable();
            $table->enum('status', ['pending', 'completed', 'failed', 'refunded', 'cancelled'])->default('pending');
            $table->string('payment_method')->nullable(); // 'stripe', 'paypal', 'bank_transfer', etc.
            $table->string('payment_id')->nullable(); // External payment processor ID
            $table->string('payment_intent_id')->nullable(); // Stripe payment intent ID
            $table->string('transaction_id')->unique()->nullable(); // Internal transaction reference
            $table->text('donor_message')->nullable();
            $table->boolean('is_anonymous')->default(false);
            $table->json('payment_metadata')->nullable(); // Store additional payment processor data
            $table->timestamp('processed_at')->nullable();
            $table->timestamp('next_payment_date')->nullable(); // For recurring donations
            $table->string('receipt_url')->nullable(); // Link to receipt/invoice
            $table->text('failure_reason')->nullable(); // If payment failed
            $table->decimal('fee_amount', 8, 2)->nullable(); // Payment processor fees
            $table->decimal('net_amount', 10, 2)->nullable(); // Amount after fees
            $table->timestamps();
            
            // Indexes for better performance
            $table->index(['status', 'created_at']);
            $table->index(['donation_type', 'status']);
            $table->index(['donor_email', 'created_at']);
            $table->index('payment_id');
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

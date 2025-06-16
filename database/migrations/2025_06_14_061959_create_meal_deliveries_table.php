<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('meal_deliveries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('meal_id')->constrained()->onDelete('cascade');
            $table->foreignId('member_id')->constrained()->onDelete('cascade');
            $table->foreignId('partner_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null'); // if a specific user/rider is doing delivery
            $table->enum('status', ['pending', 'preparing', 'out_for_delivery', 'delivered'])->default('pending');
            $table->timestamp('scheduled_at')->nullable();
            $table->timestamp('delivered_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('meal_deliveries');
    }
};

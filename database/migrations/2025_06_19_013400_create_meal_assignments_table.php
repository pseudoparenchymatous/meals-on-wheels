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
        Schema::create('meal_assignments', function (Blueprint $table) {
            $table->id();
            $table->enum('day', ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']);
            $table->enum('status', ['pending', 'preparing', 'picked up', 'on the way', 'delivered'])->default('pending');
            $table->enum('temperature', ['hot', 'frozen']);
            $table->foreignIdFor(App\Models\WeeklyPlan::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(App\Models\Member::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(App\Models\Meal::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(App\Models\KitchenPartner::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(App\Models\Rider::class)->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('meal_assignments');
    }
};

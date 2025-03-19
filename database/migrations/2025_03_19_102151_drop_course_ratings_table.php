<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Drop the course_ratings table as we're consolidating ratings and reviews
     * into the course_reviews table.
     */
    public function up(): void
    {
        Schema::dropIfExists('course_ratings');
    }

    /**
     * Reverse the migrations.
     *
     * Recreate the course_ratings table if we need to roll back.
     */
    public function down(): void
    {
        Schema::create('course_ratings', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('course_id')->constrained('courses')->cascadeOnDelete();
            $table->foreignUuid('user_id')->constrained('users')->cascadeOnDelete();
            $table->unsignedTinyInteger('rating');
            $table->unique(['course_id', 'user_id']);
            $table->timestamps();
        });
    }
};

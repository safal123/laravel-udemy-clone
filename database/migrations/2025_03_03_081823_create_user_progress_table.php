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
        Schema::create('user_progress', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->foreignUuid('user_id')
                ->constrained('users')
                ->onDelete('cascade');
            $table->foreignUuid('course_id')
                ->constrained('courses')
                ->onDelete('cascade');
            $table->foreignUuid('chapter_id')
                ->constrained('chapters')
                ->onDelete('cascade');
            $table->boolean('is_completed')
                ->default(false);
            $table->timestamp('started_at')
                ->nullable();
            $table->timestamp('completed_at')
                ->nullable();
            $table->timestamp('last_accessed_at')
                ->nullable();
            $table->integer('time_spent')
                ->default(0);

            $table->unique(['user_id', 'course_id', 'chapter_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_progress');
    }
};

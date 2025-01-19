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
        Schema::create('wishlists', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table
                ->foreignUuid('user_id')
                ->constrained()
                ->onDelete('cascade');
            $table
                ->foreignUuid('course_id')
                ->constrained()
                ->onDelete('cascade');
            $table->unique(['user_id', 'course_id']);
            $table->softDeletes();
            $table
                ->timestamp('purchased_at')
                ->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wishlists');
    }
};

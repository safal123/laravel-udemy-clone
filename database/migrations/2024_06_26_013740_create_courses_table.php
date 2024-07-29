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
        Schema::create('courses', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->string('slug')
                ->unique();
            $table->text('description')->nullable();
            $table->string('image_storage_id')->nullable();
            $table->decimal('price');
            $table->boolean('is_published')->default(false);
            $table->foreignUuid('user_id')
                ->constrained('users')
                ->cascadeOnDelete();
            $table->foreignUuid('category_id')
                ->nullable()
                ->constrained('categories')
                ->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};

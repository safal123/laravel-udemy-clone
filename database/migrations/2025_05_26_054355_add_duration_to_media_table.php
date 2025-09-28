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
        Schema::table('media', function (Blueprint $table) {
            $table->integer('duration')->nullable();
            $table->boolean('is_processed')->default(false);
            $table->string('status')->default('pending'); // pending, processing, completed, failed
            $table
                ->foreignUuid('created_by')
                ->nullable()
                ->constrained('users')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('media', function (Blueprint $table) {
            $table->dropColumn('duration');
            $table->dropColumn('is_processed');
            $table->dropColumn('status');
            $table->dropColumn('created_by');
        });
    }
};

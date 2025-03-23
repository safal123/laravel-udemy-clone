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
        Schema::table('user_progress', function (Blueprint $table) {
            $table->float('progress_percentage')->default(0);
            $table->string('content_type')->default('chapter');
            $table->integer('current_position')->default(0);
            $table->uuid('chapter_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_progress', function (Blueprint $table) {
            $table->dropColumn('progress_percentage');
            $table->dropColumn('content_type');
            $table->dropColumn('current_position');
            $table->string('chapter_id')->nullable(false)->change();
        });
    }
};

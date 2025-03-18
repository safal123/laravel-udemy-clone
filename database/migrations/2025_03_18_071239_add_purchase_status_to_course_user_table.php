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
        Schema::table('course_user', function (Blueprint $table) {
            $table->string('purchase_status')->default('pending');
            $table->string('payment_intent_id')->nullable();
            $table->string('payment_method')->nullable();
            $table->timestamp('payment_completed_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('course_user', function (Blueprint $table) {
            $table->dropColumn('purchase_status');
            $table->dropColumn('payment_intent_id');
            $table->dropColumn('payment_method');
            $table->dropColumn('payment_completed_at');
        });
    }
};

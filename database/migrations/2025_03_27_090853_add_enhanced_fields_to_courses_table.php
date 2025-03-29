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
        Schema::table('courses', function (Blueprint $table) {
            $table->decimal('discount_price')->nullable()->after('price');
            $table->integer('duration_minutes')->nullable()->after('level');
            $table->text('requirements')->nullable()->after('description');
            $table->text('target_audience')->nullable()->after('requirements');
            $table->text('what_you_will_learn')->nullable()->after('target_audience');
            $table->string('preview_video_id')->nullable()->after('image_storage_id');
            $table->boolean('is_featured')->default(false)->after('is_published');
            $table->string('language')->default('English')->after('level');
            $table->decimal('average_rating')->nullable()->after('is_featured');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->dropColumn([
                'discount_price',
                'duration_minutes',
                'requirements',
                'target_audience',
                'what_you_will_learn',
                'preview_video_id',
                'is_featured',
                'language',
                'average_rating'
            ]);
        });
    }
};

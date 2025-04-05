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
        Schema::create('media', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('file_name');
            $table->string('disk')
                ->default('public');
            $table->string('path');
            $table->string('mime_type');
            $table->string('type')
                ->comment('video, image, document, audio, pdf, other')
                ->default('other');
            $table->unsignedBigInteger('size');
            $table->text('caption')->nullable();
            $table->json('metadata')->nullable();
            $table->uuidMorphs('model');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media');
    }
};

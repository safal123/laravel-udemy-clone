<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Chapter extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'course_id',
        'title',
        'description',
        'order',
        'video_storage_id',
        'is_free',
        'is_published',
    ];

    protected $casts = [
        'is_free' => 'boolean',
        'is_published' => 'boolean',
    ];

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function ($chapter) {
            $chapter->order = $chapter->course->chapters()->count() + 1;
        });
    }
}

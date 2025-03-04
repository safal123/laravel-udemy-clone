<?php

namespace App\Models;

use App\Models\Builders\ChapterBuilder;
use App\Models\Traits\HasS3Upload;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Chapter extends Model
{
    use HasFactory, HasS3Upload, HasUuids;

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

    public static function query(): Builder
    {
        return parent::query();
    }

    public function newEloquentBuilder($query): ChapterBuilder
    {
        return new ChapterBuilder($query);
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function progress(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(UserProgress::class);
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function ($chapter) {
            $chapter->order = $chapter->course->chapters()->count() + 1;
        });
    }

    public function getVideoUrlAttribute(): string
    {
        return $this->video_storage_id
            ? "https://laravel-udemy-clone-converted.s3.amazonaws.com/courses/chapters/videos/{$this->id}/master.m3u8"
            : '';
    }

    public function next()
    {
        return self::where('id', '>', $this->id) // Get records with UUID greater than current
            ->orderBy('id', 'asc') // Order by ascending UUID
            ->first();
    }

    public function previous()
    {
        return self::where('id', '<', $this->id) // Get records with UUID smaller than current
            ->orderBy('id', 'desc') // Order by descending UUID
            ->first();
    }
}

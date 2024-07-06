<?php

namespace App\Models;

use App\Models\Traits\HasS3Upload;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Course extends Model
{
    use HasFactory, HasUuids, HasS3Upload;

    protected $fillable = [
        'title',
        'description',
        'price',
        'is_published',
        'image_storage_id',
        'slug',
        'category_id',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class)
            ->using(CourseUser::class)
            ->withPivot('id', 'created_at', 'user_id', 'course_id');
    }

    public function chapters(): HasMany
    {
        return $this->hasMany(Chapter::class);
    }

    // set image_storage_id as the id to the course after course is created
    public static function boot(): void
    {
        parent::boot();
        static::created(function ($course) {
            $course->update([
                'image_storage_id' => $course->id,
            ]);
            // Once the course is created, upload the default image
            $course->uploadDefaultImage('courses/images', $course->id, 'course');
        });
    }
}

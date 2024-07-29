<?php

namespace App\Models;

use App\Models\Traits\HasS3Upload;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

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

    public static function boot()
    {
        parent::boot();
        static::created(function ($course) {
            $course->update([
                'image_storage_id' => $course->id,
            ]);
            // Once the course is created, upload the default image
            $file = public_path("images/default-course-image.jpg");
            $course->uploadToS3('courses/images', $file, $course->id);
        });
    }

    public function getImageUrlAttribute(): string
    {
        if (empty($this->image_storage_id)) {
            return '';
        }
        return $this->getObjectUrl('courses/images/');
    }
}

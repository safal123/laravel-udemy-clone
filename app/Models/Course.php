<?php

namespace App\Models;

use App\Models\Builders\CourseBuilder;
use App\Models\Constants\CourseConstants;
use App\Models\Traits\HasS3Upload;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Course extends Model implements CourseConstants
{
    use HasFactory, HasS3Upload, HasUuids;

    //    protected $with = ['author'];

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

    public static function query(): Builder
    {
        return parent::query();
    }

    public function newEloquentBuilder($query): CourseBuilder
    {
        return new CourseBuilder($query);
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function students(): BelongsToMany
    {
        return $this
            ->belongsToMany(User::class, 'course_user')
            ->withPivot('id', 'created_at', 'user_id', 'course_id')
            ->as('purchaseDetails');
    }

    public function wishlists(): HasMany
    {
        return $this->hasMany(Wishlist::class);
    }

    public function progress(): HasMany
    {
        return $this->hasMany(UserProgress::class);
    }

    public function chapters(): HasMany
    {
        return $this
            ->hasMany(Chapter::class)
            ->orderBy('order');
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(CourseReview::class)->latest();
    }

    public function averageRating(): float
    {
        return $this
            ->reviews()
            ->avg('rating') ?? 0;
    }

    public static function boot()
    {
        parent::boot();
        static::created(function ($course) {
            $course->update([
                'image_storage_id' => $course->id,
            ]);
            $file = public_path('images/default-course-image.jpg');
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

    public function hasPublishedChapter(): bool
    {
        return $this
            ->chapters()
            ->where('is_published', true)
            ->exists();
    }

    public function isFree(): bool
    {
        return $this->price === 0;
    }

    public function userProgress()
    {
        return $this->hasMany(UserProgress::class);
    }

    /**
     * Get the category that owns the course.
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}

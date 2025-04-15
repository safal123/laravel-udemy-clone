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
use Illuminate\Support\Facades\Cache;
use Laravel\Scout\Searchable;

class Course extends Model implements CourseConstants
{
    use HasFactory, HasS3Upload, HasUuids, Searchable;

    //    protected $with = ['author'];

    protected $fillable = [
        'title',
        'description',
        'price',
        'discount_price',
        'is_published',
        'is_featured',
        'image_storage_id',
        'preview_video_id',
        'slug',
        'category_id',
        'level',
        'language',
        'duration_minutes',
        'requirements',
        'target_audience',
        'what_you_will_learn',
        'tags',
        'average_rating',
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

    public static function boot()
    {
        parent::boot();
        static::created(function ($course) {
            Cache::forget('total_courses');
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

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function media()
    {
        return $this->morphMany(Media::class, 'model');
    }

    public function thumbnail()
    {
        return $this->morphOne(Media::class, 'model')->where('type', 'thumbnail');
    }

    public function videos()
    {
        return $this->morphMany(Media::class, 'model')->where('type', 'video');
    }

    public function images()
    {
        return $this->morphMany(Media::class, 'model')->where('type', 'image');
    }

    /**
     * Get the indexable data array for the model.
     * This is used by Laravel Scout when installed.
     *
     * @return array
     */
    public function toSearchableArray(): array
    {
        return [
            'title' => $this->title,
            'description' => $this->description,
            'price' => $this->price,
            'level' => $this->level,
            'language' => $this->language,
            'requirements' => $this->requirements,
            'target_audience' => $this->target_audience,
            'what_you_will_learn' => $this->what_you_will_learn,
            'tags' => $this->tags,
        ];
    }

    /**
     * Determine if the model should be searchable.
     * This is used by Laravel Scout when installed.
     *
     * @return bool
     */
    public function shouldBeSearchable(): bool
    {
        // Only index courses that are published and have at least one published chapter
        return $this->is_published && $this->hasPublishedChapter();
    }
}

<?php

namespace App\Models\Builders;

use App\Models\Constants\CourseUserConstants;
use Illuminate\Database\Eloquent\Builder;

class CourseBuilder extends Builder
{
    /*
    * Qualify the course for building the query.
    * Only published courses with published chapters are qualified.
    */
    public function qualify(): self
    {
        return $this
            ->published()
            ->whereHasPublishedChapters();
    }

    /**
     * Filter only published courses.
     */
    public function published(): self
    {
        return $this->where('is_published', true);
    }

    /**
     * Filter only courses that have published chapters.
     */
    public function whereHasPublishedChapters(): self
    {
        return $this
            ->whereHas('chapters', function ($query) {
                $query
                    ->where('is_published', true)
                    ->whereNotNull('video_storage_id');
            });
    }

    /**
     * Eager load the course author.
     */
    public function loadAuthor(): self
    {
        return $this->with('author:id,name');
    }

    /**
     * Load the passed relations.
     */
    public function loadRelations(array $relations): self
    {
        if (empty($relations)) {
            return $this;
        }

        return $this->with($relations);
    }

    /**
     * Eager load only published chapters.
     */
    public function loadPublishedChapters(): self
    {
        return $this->with([
            'chapters' => fn($query) => $query
                ->where('is_published', true)
                ->whereNotNull('video_storage_id'),
        ]);
    }

    /**
     * Count only published chapters with a valid video.
     */
    public function countPublishedChapters(): self
    {
        return $this->withCount([
            'chapters' => fn($query) => $query
                ->where('is_published', true)
                ->whereNotNull('video_storage_id'),
        ]);
    }

    /**
     * Order courses by newest first.
     */
    public function orderByCreatedAtDesc(): self
    {
        return $this->orderBy('created_at', 'desc');
    }

    /**
     * Retrieve all published courses that have at least one published chapter.
     * Eager loads the author, published chapters, counts chapters, and orders by creation date.
     */
    public function allPublishedCourses(): self
    {
        return $this
            ->published()
            ->whereHasPublishedChapters()
            ->loadAuthor()
            ->countPublishedChapters()
            ->orderByCreatedAtDesc();
    }

    /**
     * Load user-specific attributes.
     *
     * @param  int|null  $userId
     */
    public function withUserSpecificAttributes($userId): self
    {
        return $this->when($userId, function ($query) use ($userId) {
            $query->withExists([
                'students as is_enrolled' => function ($query) use ($userId) {
                    $query
                        ->where('course_user.user_id', $userId)
                        ->where('course_user.purchase_status', '=', CourseUserConstants::SUCCEEDED);
                },
                'wishlists as is_wishlisted' => function ($query) use ($userId) {
                    $query->where('wishlists.user_id', $userId);
                },
                'author as is_author' => function ($query) use ($userId) {
                    $query->where('user_id', $userId);
                },
                'reviews as has_reviewed' => function ($query) use ($userId) {
                    $query->where('course_reviews.user_id', $userId);
                },
            ]);
        });
    }

    public function category($categories): self
    {
        return $this->when($categories, function ($query, $categories) {
            $categories = is_array($categories) ? $categories : [$categories];
            $query->whereHas('category', fn($q) => $q->whereIn('name', $categories));
        });
    }

    public function level(?string $level): self
    {
        return $this->when($level, fn($query, $level) => $query->where('level', $level));
    }

    public function price(?string $price): self
    {
        return $this->when($price, function ($query, $price) {
            match ($price) {
                'free' => $query->where('price', 0),
                'under-50' => $query->whereBetween('price', [0.01, 50]),
                '50-100' => $query->whereBetween('price', [50.01, 100]),
                'over-100' => $query->where('price', '>', 100),
                default => $query,
            };
        });
    }

    public function sort(?string $sort): self
    {
        $column = match ($sort) {
            'rating' => 'reviews_avg_rating',
            'newest' => 'created_at',
            'price-low', 'price-high' => 'price',
            default => 'students_count',
        };

        $direction = match ($sort) {
            'price-high' => 'desc',
            'price-low' => 'asc',
            'newest' => 'desc',
            'rating' => 'desc',
            default => 'desc',
        };


        if ($column === 'reviews_avg_rating') {
            return $this->withAvg('reviews', 'rating')
                ->orderBy('reviews_avg_rating', $direction);
        }

        return $this->orderBy($column, $direction);
    }
}

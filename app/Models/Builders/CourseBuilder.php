<?php

namespace App\Models\Builders;

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
            ->loadPublishedChapters()
            ->countPublishedChapters()
            ->orderByCreatedAtDesc();
    }

    /**
     * Load user-specific attributes.
     * @param int|null $userId
     * @return self
     */
    public function withUserSpecificAttributes($userId): self
    {
        return $this->when($userId, function ($query) use ($userId) {
            $query->withExists([
                'students as is_enrolled' => function ($query) use ($userId) {
                    $query
                        ->where('course_user.user_id', $userId);
                    // TODO: Uncomment this when we have a way to handle pending purchases
                    // ->where('course_user.purchase_status', '!=', 'pending');
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
}

<?php

namespace App\Models\Builders;

use Illuminate\Database\Eloquent\Builder;

class CourseBuilder extends Builder
{
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
        return $this->whereHas('chapters', function ($query) {
            $query->where('is_published', true)
                ->whereNotNull('video_storage_id');
        });
    }

    /**
     * Eager load the course author.
     */
    public function loadAuthor(): self
    {
        return $this->with('author');
    }

    /**
     * Eager load only published chapters.
     */
    public function loadPublishedChapters(): self
    {
        return $this->with(['chapters' => fn ($query) => $query
            ->where('is_published', true)
            ->whereNotNull('video_storage_id'),
        ]);
    }

    /**
     * Count only published chapters with a valid video.
     */
    public function countPublishedChapters(): self
    {
        return $this->withCount(['chapters' => fn ($query) => $query
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
}

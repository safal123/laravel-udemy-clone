<?php

namespace App\Models\Builders;

use Illuminate\Database\Eloquent\Builder;

class CourseBuilder extends Builder
{
    /**
     * Only return published courses.
     *
     * @return self
     */
    public function published(): self
    {
        return $this->where('is_published', true);
    }

    /**
     * Only return courses with published chapters.
     *
     * @return self
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

    public function loadAuthor(): self
    {
        return $this->with('author');
    }

    public function loadPublishedChapters(): self
    {
        return $this->with([
            'chapters' => function ($query) {
                $query
                    ->where('is_published', true)
                    ->whereNotNull('video_storage_id');
            }
        ]);
    }

    public function countChapters(): self
    {
        return $this->withCount([
            'chapters' => function ($query) {
                $query
                    ->where('is_published', true)
                    ->whereNotNull('video_storage_id');
            }
        ]);
    }

    public function orderByCreatedAtDesc(): self
    {
        return $this->orderBy('created_at', 'desc');
    }

    /**
     * All Published Courses which have published chapters
     * eager load author, published chapters, count chapters and order by created_at desc
     *
     * @return self
     */
    public function allPublishedCourses(): self
    {
        return $this
            ->published()
            ->whereHasPublishedChapters()
            ->loadAuthor()
            ->loadPublishedChapters()
            ->countChapters()
            ->orderByCreatedAtDesc();
    }
}

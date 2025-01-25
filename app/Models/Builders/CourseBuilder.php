<?php

namespace App\Models\Builders;

use Illuminate\Database\Eloquent\Builder;

class CourseBuilder extends Builder
{
    /**
     * Only return published courses.
     */
    public function published(): self
    {
        return $this->where('is_published', true);
    }

    /**
     * Only return courses with published chapters.
     */
    public function whereHasPublishedChapters(): self
    {
        return $this->whereHas('chapters', function ($query) {
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
            },
        ]);
    }

    public function countPublishedChapters(): self
    {
        return $this->withCount([
            'chapters' => function ($query) {
                $query
                    ->where('is_published', true)
                    ->whereNotNull('video_storage_id');
            },
        ]);
    }

    public function orderByCreatedAtDesc(): self
    {
        return $this->orderBy('created_at', 'desc');
    }

    /**
     * All Published Courses which have published chapters
     * eager load author, published chapters, count chapters and order by created_at desc
     */
    public function allPublishedCourses(): self
    {
        return $this
            ->published()
            ->whereHasPublishedChapters()
            ->with([
                'author',
                'chapters' => function ($query) {
                    $query->where('is_published', true)->whereNotNull('video_storage_id');
                },
            ])
            ->withCount([
                'chapters' => function ($query) {
                    $query->where('is_published', true)->whereNotNull('video_storage_id');
                },
            ])
            ->orderByCreatedAtDesc();
    }
}

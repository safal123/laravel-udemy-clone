<?php

namespace App\Services;

use App\Models\Course;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Cache;

class CourseService
{
    private const CACHE_TTL = 3600; // 1 hour
    private const ITEMS_PER_SECTION = 4;

    /*
    * Get the courses for the home page.
    *
    * @return array
    */
    public function getHomePageCourses(): array
    {
        return Cache::remember('homepage_courses', self::CACHE_TTL, function () {
            $baseQuery = Course::query()
                ->allPublishedCourses()
                ->withAvg('reviews', 'rating')
                ->withCount(['reviews', 'students']);

            return [
                'newReleases' => $this->getNewReleases($baseQuery),
                'mostPopular' => $this->getMostPopular($baseQuery),
                'topRated' => $this->getTopRated($baseQuery)
            ];
        });
    }

    private function getNewReleases($query): Collection
    {
        return (clone $query)
            ->latest()
            ->take(self::ITEMS_PER_SECTION)
            ->get();
    }

    private function getMostPopular($query): Collection
    {
        return (clone $query)
            ->orderByDesc('students_count')
            ->take(self::ITEMS_PER_SECTION)
            ->get();
    }

    private function getTopRated($query): Collection
    {
        return (clone $query)
            ->whereHas('reviews', function ($query) {
                $query
                    ->select('course_id')
                    ->groupBy('course_id')
                    ->havingRaw('AVG(rating) > 0');
            })
            ->orderByDesc('reviews_avg_rating')
            ->take(self::ITEMS_PER_SECTION)
            ->get();
    }

    /**
     * Forget the homepage courses cache.
     *
     * This method clears the cached homepage courses data when course data changes.
     * Should be called after course creation, updates, or deletions to ensure
     * fresh data is displayed on the homepage.
     *
     * @return void
     */
    public function forgetCache(): void
    {
        Cache::forget('homepage_courses');
    }
}

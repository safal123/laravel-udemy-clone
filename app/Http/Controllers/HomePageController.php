<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Models\Course;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Cache;

class HomePageController extends Controller
{
    public function index(): Response
    {
        $userId = Auth::id();
        $cacheKey = 'homepage_courses_' . ($userId ?? 'guest');

        try {
            $coursesData = Cache::remember($cacheKey, 3600, function () use ($userId) {
                $baseQuery = Course::query()
                    ->whereNotNull('tags')
                    ->allPublishedCourses()
                    ->withAvg('reviews', 'rating')
                    ->withCount(['reviews', 'students']);

                if ($userId) {
                    $baseQuery->withUserSpecificAttributes($userId);
                }

                return [
                    'newReleases' => (clone $baseQuery)
                        ->latest()
                        ->take(4)
                        ->get(),

                    'mostPopular' => (clone $baseQuery)
                        ->orderByDesc('students_count')
                        ->take(4)
                        ->get(),

                    'topRated' => (clone $baseQuery)
                        ->having('reviews_avg_rating', '>', 0)
                        ->orderByDesc('reviews_avg_rating')
                        ->take(4)
                        ->get()
                ];
            });
        } catch (\Exception $e) {
            // Fallback to empty collections if cache or query fails
            $coursesData = [
                'newReleases' => collect(),
                'mostPopular' => collect(),
                'topRated' => collect()
            ];
        }

        return Inertia::render('Welcome', [
            'courses' => [
                'newReleases' => CourseResource::collection($coursesData['newReleases']),
                'mostPopular' => CourseResource::collection($coursesData['mostPopular']),
                'topRated' => CourseResource::collection($coursesData['topRated']),
            ],
        ]);
    }

    public function ui(): Response
    {
        return Inertia::render('UI');
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Services\CourseService;
use Inertia\Inertia;
use Inertia\Response;

class HomePageController extends Controller
{
    public function __construct(
        private readonly CourseService $courseService
    ) {}

    public function __invoke(): Response
    {
        $coursesData = $this->courseService->getHomePageCourses();

        return Inertia::render('Welcome', [
            'courses' => [
                'newReleases' => CourseResource::collection($coursesData['newReleases']),
                'mostPopular' => CourseResource::collection($coursesData['mostPopular']),
                'topRated' => CourseResource::collection($coursesData['topRated']),
            ],
        ]);
    }
}

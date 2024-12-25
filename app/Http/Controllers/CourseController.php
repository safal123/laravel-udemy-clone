<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Models\Course;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
{
    public function show(Course $course): Response
    {
        $course
            ->load([
                'author',
                'chapters' => function ($query) {
                    $query->where('is_published', true)
                        ->where('video_storage_id', '!=', null);
                }
            ])
            ->loadCount('chapters');

        return Inertia::render('Course/Show/Index', [
            'course' => new CourseResource($course),
        ]);
    }
}

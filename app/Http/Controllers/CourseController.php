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
                },
            ])
            ->loadCount('chapters');

        // Create payment intent for the course
        $paymentIntent = request()->user()->pay($course->price * 100, [
            'metadata' => [
                'course_id' => $course->id,
                'user_id' => request()->user()->id,
            ],
        ]);

        return Inertia::render('Course/Show/Index', [
            'course' => new CourseResource($course),
            'clientSecret' => $paymentIntent->client_secret ?? null,
        ]);
    }
}

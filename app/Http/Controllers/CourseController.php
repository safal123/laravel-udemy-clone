<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
{
    public function show(Course $course): Response
    {
        $course = Course::query()
            ->where('id', $course->id)
            ->with('author', 'chapters')
            ->withCount('chapters')
            ->firstOrFail();
        return Inertia::render('Course/Show/Index', [
            'course' => new CourseResource($course),
        ]);
    }
}

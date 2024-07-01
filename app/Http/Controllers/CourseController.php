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
        return Inertia::render('Course/Show/Index', [
            'course' => new CourseResource($course),
            'chapters' => $course->chapters()->orderBy('order')->get(),
        ]);
    }
}

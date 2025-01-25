<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Models\Course;
use Inertia\Inertia;
use Inertia\Response;

class HomePageController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Welcome', [
            'courses' => CourseResource::collection(
                Course::query()
                    ->allPublishedCourses()
                    ->paginate(10)
            ),
        ]);
    }
}

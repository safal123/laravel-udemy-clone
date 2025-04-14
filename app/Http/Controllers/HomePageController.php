<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Models\Course;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class HomePageController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Welcome', [
            'courses' => CourseResource::collection(
                Course::query()
                    ->whereNotNull('tags')
                    ->allPublishedCourses()
                    ->withAvg('reviews', 'rating')
                    ->withCount('reviews', 'students')
                    ->withUserSpecificAttributes(Auth::id())
                    ->paginate(4)
            ),
        ]);
    }

    public function ui(): Response
    {
        return Inertia::render('UI');
    }
}

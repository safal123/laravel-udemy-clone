<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Models\Course;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class HomePageController extends Controller
{
    public function index()
    {
        $courses = Course::query()
            ->where('is_published', true)
            ->orderBy('created_at', 'desc')
            ->with('author')
            // check if the chapters is present
            ->whereHas('chapters', function ($query) {
                $query->where('is_published', true);
            })
            ->paginate(3);

        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'courses' => CourseResource::collection($courses)
        ]);
    }
}

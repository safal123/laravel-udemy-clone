<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Models\Course;
use Inertia\Inertia;

class HomePageController extends Controller
{
    public function index()
    {
        return Inertia::render('Welcome', [
            'courses' => CourseResource::collection(
                Course::query()
                    ->where('is_published', true)
                    ->orderBy('created_at', 'desc')
                    ->with('author')
                    // check if the chapters is present
                    ->whereHas('chapters', function ($query) {
                        $query->where('is_published', true);
                    })
                    ->withCount('chapters'      )
                    ->paginate(4)
            )
        ]);
    }
}

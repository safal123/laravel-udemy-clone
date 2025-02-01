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
                    ->allPublishedCourses()
                    ->when(Auth::check(), function ($query) {
                        $query->withExists([
                            'students as is_enrolled' => function ($query) {
                                $query->where('course_user.user_id', Auth::id());
                            },
                            'wishlists as is_wishlisted' => function ($query) {
                                $query->where('wishlists.user_id', Auth::id());
                            }
                        ]);
                    })
                    ->paginate(4)
            ),
        ]);
    }
}

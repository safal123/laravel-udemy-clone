<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Models\Course;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(): \Inertia\Response
    {
        $userCourses = Course::query()
            ->whereHas('students', function ($query) {
                $query->where('course_user.user_id', auth()->id());
            })
            ->with(['author', 'chapters'])
            ->get();

        return Inertia::render('Dashboard', [
            'courses' => CourseResource::collection($userCourses),
        ]);
    }
}

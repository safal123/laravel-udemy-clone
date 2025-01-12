<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Models\CourseUser;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(): \Inertia\Response
    {
        $userCourses = auth()
            ->user()
            ->purchasedCourses()
            ->with(['author', 'chapters'])
            ->get();

        return Inertia::render('Dashboard', [
            'courses' => CourseResource::collection($userCourses),
        ]);
    }
}

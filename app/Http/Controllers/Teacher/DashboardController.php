<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the teacher dashboard.
     */
    public function index(): \Inertia\Response
    {
        $students = User::query()
            ->whereHas('purchasedCourses', function ($query) {
                $query->where('courses.user_id', auth()->id());
            })
            ->get();

        return Inertia::render('Teacher/Dashboard/Index', [
            'students' => UserResource::collection($students),
        ]);
    }
}

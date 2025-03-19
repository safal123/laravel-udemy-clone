<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Models\Course;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Course/Index');
    }

    public function show(Course $course): Response
    {
        return Inertia::render('Course/Show/Index', [
            'course' => new CourseResource(
                Course::query()
                    ->whereHasPublishedChapters()
                    ->loadRelations([
                        'author:id,name,email',
                        'chapters' => function ($query) {
                            $query
                                ->select([
                                    'id',
                                    'title',
                                    'order',
                                    'course_id',
                                    'is_free',
                                ])
                                ->orderBy('order');
                        },
                        'wishlists',
                        'reviews.user:id,name:',
                        'students' => function ($query) use ($course) {
                            $query
                                ->withPivot([
                                    'id',
                                    'created_at',
                                    'user_id',
                                    'course_id',
                                ])
                                ->as('purchaseDetails')
                                ->as('purchaseDetails')
                                ->where('course_user.user_id', Auth::id())
                                ->where('course_user.course_id', $course->id);
                        },
                    ])
                    ->withCount([
                        'students',
                    ])
                    ->withUserSpecificAttributes(Auth::id())
                    ->find($course->id)
            ),
        ]);
    }
}

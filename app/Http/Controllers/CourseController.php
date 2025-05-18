<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Models\Course;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class CourseController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Course/Index', [
            'courses' => CourseResource::collection(
                Course::search($request->search)
                    ->query(function ($query) use ($request) {
                        return $query->whereHasPublishedChapters()
                            ->category($request->category)
                            ->level($request->level)
                            ->price($request->price);
                    })
                    ->paginate($request->per_page ?? 12)
            ),
        ]);
    }

    public function show(Course $course): Response
    {
        return Inertia::render('Course/Show/Index', [
            'course' => new CourseResource(
                Course::query()
                    ->whereHasPublishedChapters()
                    ->withCount(['students', 'reviews'])
                    ->withAvg('reviews', 'rating')
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
                        'chapters.media' => function ($query) {
                            $query
                                ->where('type', 'video');
                        },
                        'chapters.progress' => function ($query) {
                            $query
                                ->where('user_id', Auth::id());
                        },
                        'wishlists' => function ($query) {
                            $query->select(['id', 'user_id', 'course_id']);
                        },
                        'reviews.user:id,name:',
                        'students' => function ($query) use ($course) {
                            $query
                                ->withPivot([
                                    'id',
                                    'created_at',
                                    'user_id',
                                    'course_id',
                                    'purchase_status'
                                ])
                                ->as('purchaseDetails')
                                ->where('course_user.user_id', Auth::id())
                                ->where('course_user.course_id', $course->id);
                        },
                        'userProgress' => function ($query) use ($course) {
                            $query
                                ->where('user_id', Auth::id())
                                ->where('course_id', $course->id)
                                ->where('content_type', '=', 'course')
                                ->orderBy('created_at', 'desc')
                                ->first();
                        },
                    ])
                    ->withUserSpecificAttributes(Auth::id())
                    ->find($course->id)
            ),
        ]);
    }
}

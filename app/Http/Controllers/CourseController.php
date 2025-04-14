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
        $courses = Course::query()
            ->whereHasPublishedChapters()
            ->withCount('students')
            ->withCount('reviews')
            ->withAvg('reviews', 'rating')
            ->with('category')
            ->when($request->has('search') && !empty($request->search), function ($query) use ($request) {
                $query->where(function ($q) use ($request) {
                    $q->where('title', 'like', '%' . $request->search . '%')
                        ->orWhere('description', 'like', '%' . $request->search . '%');
                });
            })
            ->when($request->has('category') && !empty($request->category), function ($query) use ($request) {
                $query->whereHas('category', function ($q) use ($request) {
                    $q->whereIn('name', $request->category);
                });
            })
            ->when($request->has('level') && !empty($request->level), function ($query) use ($request) {
                $query->where('level', $request->level);
            })
            ->when($request->has('price') && !empty($request->price), function ($query) use ($request) {
                match ($request->price) {
                    'free' => $query->where('price', 0),
                    'under-50' => $query->where('price', '>', 0)->where('price', '<=', 50),
                    '50-100' => $query->where('price', '>', 50)->where('price', '<=', 100),
                    'over-100' => $query->where('price', '>', 100),
                    default => $query,
                };
            })
            ->when($request->has('sort') && !empty($request->sort), function ($query) use ($request) {
                match ($request->sort) {
                    'rating' => $query->orderBy('reviews_avg_rating', 'desc'),
                    'newest' => $query->orderBy('created_at', 'desc'),
                    'price-low' => $query->orderBy('price', 'asc'),
                    'price-high' => $query->orderBy('price', 'desc'),
                    default => $query->orderBy('students_count', 'desc'),
                };
            })
            ->paginate($request->per_page ?? 12)
            ->withQueryString();

        return Inertia::render('Course/Index', [
            'courses' => CourseResource::collection($courses),
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
                                ->as('purchaseDetails')
                                ->where('course_user.user_id', Auth::id())
                                ->where('course_user.course_id', $course->id);
                        },
                        'userProgress' => function ($query) use ($course) {
                            $query
                                ->where('user_id', Auth::id())
                                ->where('course_id', $course->id)
                                ->where('content_type', '=', 'course');
                        },
                    ])
                    ->withUserSpecificAttributes(Auth::id())
                    ->find($course->id)
            ),
        ]);
    }
}

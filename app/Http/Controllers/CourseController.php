<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Models\Course;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index(Request $request): Response
    {
        // Start with the base query
        $query = Course::query()
            ->whereHasPublishedChapters()
            ->withCount('students')
            ->with('category');

        // Apply search filter if provided
        if ($request->has('search') && !empty($request->search)) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('title', 'like', '%' . $searchTerm . '%')
                    ->orWhere('description', 'like', '%' . $searchTerm . '%');
            });
        }

        // Apply category filter if provided
        if ($request->has('category') && !empty($request->category)) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('name', $request->category);
            });
        }

        // Apply level filter if provided
        if ($request->has('level') && !empty($request->level)) {
            $query->where('level', $request->level);
        }

        // Apply price filter if provided
        if ($request->has('price') && !empty($request->price)) {
            switch ($request->price) {
                case 'free':
                    $query->where('price', 0);
                    break;
                case 'under-50':
                    $query->where('price', '>', 0)->where('price', '<=', 50);
                    break;
                case '50-100':
                    $query->where('price', '>', 50)->where('price', '<=', 100);
                    break;
                case 'over-100':
                    $query->where('price', '>', 100);
                    break;
            }
        }

        // Apply sorting if provided
        if ($request->has('sort') && !empty($request->sort)) {
            switch ($request->sort) {
                case 'popular':
                    $query->orderBy('students_count', 'desc');
                    break;
                case 'rating':
                    $query->orderBy('rating', 'desc');
                    break;
                case 'newest':
                    $query->orderBy('created_at', 'desc');
                    break;
                case 'price-low':
                    $query->orderBy('price', 'asc');
                    break;
                case 'price-high':
                    $query->orderBy('price', 'desc');
                    break;
                default:
                    $query->orderBy('students_count', 'desc'); // Default sort is popular
            }
        } else {
            // Default sort is by popularity
            $query->orderBy('students_count', 'desc');
        }

        // Get pagination params and ensure they're valid
        $perPage = 6; // Number of items per page
        $page = max(1, intval($request->input('page', 1)));

        // Paginate the results
        $courses = $query->paginate($perPage, ['*'], 'page', $page)->withQueryString();

        // Get all categories for the filter - fixed to use the category relationship
        $categories = \App\Models\Category::select('id', 'name')
            ->whereHas('courses')
            ->orderBy('name')
            ->get()
            ->map(function ($category) {
                return [
                    'id' => $category->id,
                    'name' => $category->name
                ];
            });

        // Return data based on whether it's an initial load or pagination request
        return Inertia::render('Course/Index', [
            'courses' => CourseResource::collection($courses),
            'categories' => $categories,
            'search' => $request->search ?? '',
            'filters' => [
                'category' => $request->category ?? '',
                'level' => $request->level ?? '',
                'sort' => $request->sort ?? 'popular',
                'price' => $request->price ?? '',
            ],
        ]);
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
                        'userProgress' => function ($query) use ($course) {
                            $query
                                ->where('user_id', Auth::id())
                                ->where('course_id', $course->id)
                                ->where('content_type', '=', 'course');
                        },
                    ])
                    ->withCount([
                        'students',
                        'reviews'
                    ])
                    ->withUserSpecificAttributes(Auth::id())
                    ->find($course->id)
            ),
        ]);
    }
}

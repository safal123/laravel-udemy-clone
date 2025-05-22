<?php

namespace App\Http\Middleware;

use App\Http\Resources\CategoryResource;
use App\Http\Resources\UserResource;
use App\Models\Category;
use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user()
                    ? new UserResource(
                        User::with(['roles', 'wishlists.course'])
                            ->find($request->user()->id)
                    )
                    : null,
            ],
            'categories' => fn() => cache()->remember('categories', 86400, function () {
                return CategoryResource::collection(
                    Category::orderBy('name')->get()
                );
            }),
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'flash' => fn() => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
            ],
            'totalCourses' => fn() => cache()->remember('total_courses', 3600, function () {
                return Course::whereNotNull('tags')
                    ->allPublishedCourses()
                    ->count();
            }),
            'totalStudents' => fn() => cache()->remember('total_students', 3600, function () {
                return User::count();
            }),
            'totalRatings' => fn() => cache()->remember('total_ratings', 3600, function () {
                return Course::join('course_reviews', 'courses.id', '=', 'course_reviews.course_id')
                    ->whereNotNull('tags')
                    ->allPublishedCourses()
                    ->avg('course_reviews.rating') ?? 0;
            }),
        ];
    }
}

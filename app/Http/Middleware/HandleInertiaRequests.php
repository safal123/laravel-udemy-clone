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
                'user' => ($authUser = $request->user())
                    ? new UserResource(
                        $authUser->loadMissing(['wishlists.course'])
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
            'stats' => fn() => cache()->remember('site_stats', 3600, function () {
                return [
                    'totalCourses' => Course::count(),
                    'totalStudents' => User::count(),
                    'totalRatings' => Course::join('course_reviews', 'courses.id', '=', 'course_reviews.course_id')
                        ->avg('course_reviews.rating'),
                ];
            }),
        ];
    }
}

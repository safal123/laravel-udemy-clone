<?php

namespace App\Http\Middleware;

use App\Http\Resources\CategoryResource;
use App\Http\Resources\UserResource;
use App\Models\Category;
use App\Models\Course;
use App\Models\CourseRating;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user() !== null ?
                    new UserResource($request->user()->load(['roles', 'wishlists.course']))
                    : null,
            ],
            'categories' => function () {
                $date = now()->addDay();
                $cacheKey = "categories.{$date->format('Y-m-d')}";

                return cache()->remember($cacheKey, 60 * 60 * 24, function () {
                    return CategoryResource::collection(Category::all());
                });
            },
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'flash' => function () use ($request) {
                return [
                    'success' => $request->session()->get('success'),
                    'error' => $request->session()->get('error'),
                ];
            },
            'totalCourses' => Course::query()->qualify()->count(),
            'totalStudents' => User::query()->count(),
            'totalRatings' => 4.9,
        ];
    }
}

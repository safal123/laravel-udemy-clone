<?php

namespace App\Providers;

use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        JsonResource::withoutWrapping();
        $this->bootRoute();

        Gate::define('view-teacher-dashboard', function (User $user) {
            return $user->hasAnyRole(['teacher', 'admin']);
        });

        Gate::define('view-course', function (User $user, Course $course) {
            return true;
            return $user->hasAnyRole(['teacher', 'admin']) || $user->hasCoursePurchased($course);
        });
    }

    public function bootRoute(): void {}
}

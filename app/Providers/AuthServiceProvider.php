<?php

namespace App\Providers;

use App\Models\Course;
use App\Models\Dashboard;
use App\Policies\CoursePolicy;
use App\Policies\DashboardPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
  /**
   * The model to policy mappings for the application.
   *
   * @var array<class-string, class-string>
   */
  protected $policies = [
    Course::class => CoursePolicy::class,
  ];

  /**
   * Register any authentication / authorization services.
   */
  public function boot(): void
  {
    // Register the dashboard policy gates
    Gate::define('view-teacher-dashboard', [DashboardPolicy::class, 'viewTeacherDashboard']);
  }
}

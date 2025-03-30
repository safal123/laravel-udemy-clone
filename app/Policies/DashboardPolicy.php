<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;

class DashboardPolicy
{
  /**
   * Determine if the user can access the teacher dashboard.
   */
  public function viewTeacherDashboard(User $user): Response
  {
    return $user->isTeacher()
      ? Response::allow()
      : Response::deny('You must be a teacher to access this dashboard.');
  }
}

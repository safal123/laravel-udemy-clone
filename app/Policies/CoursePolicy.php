<?php

namespace App\Policies;

use App\Models\Course;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class CoursePolicy
{
    public function viewAny(User $user): Response
    {
        return $user->is_verified
            ? Response::allow()
            : Response::deny('You are not authorized to view courses.');
    }

    public function create(User $user): Response
    {
        return $user->isTeacher()
            ? Response::allow()
            : Response::deny('You are not authorized to create a course.');
    }

    public function view(User $user, Course $course): Response
    {
        return $user->isTeacherOfCourse($course)
            ? Response::allow()
            : Response::deny('You are not authorized to view this course.');
    }

    public function update(User $user, Course $course): Response
    {
        return $user->isTeacherOfCourse($course)
            ? Response::allow()
            : Response::deny('You are not authorized to update this course.');
    }

    public function delete(User $user, Course $course): Response
    {
        return $user->isTeacherOfCourse($course)
            ? Response::allow()
            : Response::deny('You are not authorized to delete this course.');
    }

    public function publish(User $user, Course $course): Response
    {
        if (! $course->hasPublishedChapter()) {
            return Response::deny('You cannot publish a course without at least one chapter published.');
        }

        return $user->isTeacherOfCourse($course)
            ? Response::allow()
            : Response::denyAsNotFound('You are not authorized to publish this course.');
    }

    public function enroll(User $user, Course $course): Response
    {
        // If the user has already purchased the course,
        // is the course free,
        // or the user is the teacher of the course
        // then do not allow the user to enroll in the course.
        if (
            $user->hasCoursePurchased($course)
            || $course->isFree()
            || $user->isTeacherOfCourse($course)
        ) {
            Response::denyWithStatus(404);
        }

        return Response::allow();
    }

    public function review(User $user, Course $course): Response
    {
        // If already reviewed, do not allow the user to review the course again.
        if ($user->hasReviewedCourse($course)) {
            return Response::deny('You have already reviewed this course.');
        }

        return $user->hasCoursePurchased($course)
            || $user->isTeacherOfCourse($course)
            ? Response::allow()
            : Response::denyWithStatus(403, 'You are not authorized to review this course.');
    }

    public function viewTeacherCourses(User $user): Response
    {
        return $user->isTeacher() ||
            $user->hasRole('super-admin')
            ? Response::allow()
            : Response::denyWithStatus(404);
    }
}

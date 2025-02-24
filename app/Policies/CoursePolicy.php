<?php

namespace App\Policies;

use App\Models\Course;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class CoursePolicy
{
    public function viewAny(User $user): Response
    {
        return $user->isTeacher()
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
        if ($user->hasCoursePurchased($course)
            || $course->isFree()
            || $user->isTeacherOfCourse($course)
        ) {
            return Response::deny('You are not authorized to enroll in this course.');
        }

        return Response::allow();
    }
}

<?php

namespace Tests\Integration\Http\Teacher\Courses;

use Inertia\Testing\AssertableInertia as Assert;
use Tests\Suite\Traits\CreatesTestCourses;
use Tests\Suite\Traits\CreatesTestUsers;
use Tests\TestCase;

class CourseControllerTest extends TestCase
{
    use CreatesTestCourses, CreatesTestUsers;

    public function test_non_teacher_cannot_access_course_index()
    {
        $this->actingAs($this->createStudentUser())
            ->get(route('teachers.courses.index'))
            ->assertForbidden();
    }

    public function test_teacher_can_access_course_index()
    {
        $this->actingAs($this->createTeacherUser())
            ->get(route('teachers.courses.index'))
            ->assertInertia(
                fn(Assert $assert) => $assert
                    ->component('Teacher/Courses/Index')
            );
    }

    // TODO: Think, if this test is needed 🤔
    public function test_teacher_can_access_course_index_with_courses_created()
    {
        $response = $this->createCourseWithTeacherAndStudents();

        $this->actingAs($response['teacher'])
            ->get(route('teachers.courses.index'))
            ->assertInertia(fn(Assert $assert) => $assert
                ->component('Teacher/Courses/Index')
                ->has('courses'));
    }

    public function test_teacher_can_only_see_their_own_courses()
    {
        // Create a teacher with their own course
        $teacherOneData = $this->createCourseWithTeacherAndStudents();
        $teacherOne = $teacherOneData['teacher'];
        $teacherOneCourse = $teacherOneData['course'];

        $teacherTwoData = $this->createCourseWithTeacherAndStudents();
        $teacherTwoCourse = $teacherTwoData['course'];

        $this->actingAs($teacherOne)
            ->get(route('teachers.courses.index'))
            ->assertInertia(fn(Assert $assert) => $assert
                ->component('Teacher/Courses/Index')
                ->has('courses.data', 1)
                ->has('courses.data.0', fn(Assert $assert) => $assert
                    ->where('id', $teacherOneCourse->id)
                    ->etc()
                )
                ->where('courses.data', function ($courses) use ($teacherTwoCourse) {
                    return !collect($courses)->contains('id', $teacherTwoCourse->id);
                })
                ->has('courses.meta')
                ->has('courses.links')
            );
    }
}

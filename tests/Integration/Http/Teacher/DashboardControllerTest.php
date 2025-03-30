<?php

namespace Tests\Integration\Http\Teacher;

use Database\Seeders\RolesAndPermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\Suite\Traits\CreatesTestCourses;
use Tests\Suite\Traits\CreatesTestUsers;
use Tests\TestCase;

class DashboardControllerTest extends TestCase
{
    use CreatesTestUsers, RefreshDatabase, CreatesTestCourses;

    public function test_cannot_access_teacher_dashboard_if_not_authenticated()
    {
        $this
            ->get(route('teachers.dashboard'))
            ->assertRedirect(route('login'));
    }

    public function test_teacher_can_access_teacher_dashboard()
    {
        $this
            ->actingAs($this->createTeacherUser())
            ->get(route('teachers.dashboard'))
            ->assertInertia(
                fn(Assert $assert) => $assert
                    ->component('Teacher/Dashboard/Index')
                    ->has('students')
            );
    }

    public function test_teacher_can_access_teacher_dashboard_with_students()
    {
        $response = $this->createCourseWithTeacherAndStudents();

        $this->actingAs($response['teacher'])
            ->get(route('teachers.dashboard'))
            ->assertInertia(
                fn(Assert $assert) => $assert
                    ->component('Teacher/Dashboard/Index')
                    ->has('students')
                    ->has('students', count($response['students']))
            );
    }
}

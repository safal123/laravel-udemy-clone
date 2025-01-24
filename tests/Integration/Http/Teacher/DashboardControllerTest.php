<?php

namespace Tests\Integration\Http\Teacher;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\Suite\Traits\CreatesUsers;
use Tests\TestCase;

class DashboardControllerTest extends TestCase
{
    use RefreshDatabase, CreatesUsers;

    public function setUp(): void
    {
        parent::setUp();
    }

    public function test_cannot_access_teacher_dashboard_if_not_authenticated()
    {
        $this
            ->get(route('teachers.dashboard'))
            ->assertRedirect(route('login'));
    }

    public function test_can_access_teacher_dashboard()
    {
        $this
            ->actingAs($this->createUser())
            ->get(route('teachers.dashboard'))
            ->assertInertia(fn (Assert $assert) => $assert
                ->component('Teacher/Dashboard/Index')
                ->has('students')
            );
    }
}

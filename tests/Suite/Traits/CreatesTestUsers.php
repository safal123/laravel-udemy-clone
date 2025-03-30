<?php

namespace Tests\Suite\Traits;

use App\Models\User;

use function Tests\Suite\create;

trait CreatesTestUsers
{
    public function createUser($data = [])
    {
        return create(User::factory()->create($data));
    }

    public function createTeacherUser($data = [])
    {
        // Make sure to seed RolesAndPermissionsSeeder before using this method
        $user = $this->createUser($data);
        $user->assignRole('teacher');

        return $user;
    }

    public function createStudentUser($data = [])
    {
        $user = $this->createUser($data);
        $user->assignRole('student');

        return $user;
    }

    public function createAdminUser($data = [])
    {
        $user = $this->createUser($data);
        $user->assignRole('admin');

        return $user;
    }
}

<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Truncate tables to avoid duplicate entries
        Schema::disableForeignKeyConstraints();
        Permission::query()->delete();
        Role::query()->delete();
        Schema::enableForeignKeyConstraints();

        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create roles
        Role::create(['name' => 'super-admin']);
        Role::create(['name' => 'admin']);
        Role::create(['name' => 'teacher']);
        Role::create(['name' => 'student']);

        // Create permissions

        // Course permissions
        Permission::create(['name' => 'create courses']);
        Permission::create(['name' => 'edit any course']);
        Permission::create(['name' => 'edit own courses']);
        Permission::create(['name' => 'delete any course']);
        Permission::create(['name' => 'delete own courses']);
        Permission::create(['name' => 'view any course']);
        Permission::create(['name' => 'view own courses']);
        Permission::create(['name' => 'publish any course']);
        Permission::create(['name' => 'publish own courses']);
        Permission::create(['name' => 'feature courses']);
        Permission::create(['name' => 'set course pricing']);

        // Chapter permissions
        Permission::create(['name' => 'create chapters']);
        Permission::create(['name' => 'edit any chapter']);
        Permission::create(['name' => 'edit own chapters']);
        Permission::create(['name' => 'delete any chapter']);
        Permission::create(['name' => 'delete own chapters']);
        Permission::create(['name' => 'reorder chapters']);
        Permission::create(['name' => 'mark chapters as free']);

        // Content permissions
        Permission::create(['name' => 'upload videos']);
        Permission::create(['name' => 'manage attachments']);
        Permission::create(['name' => 'create quizzes']);
        Permission::create(['name' => 'edit quizzes']);

        // Student management
        Permission::create(['name' => 'view student progress']);
        Permission::create(['name' => 'enroll students']);
        Permission::create(['name' => 'remove students']);
        Permission::create(['name' => 'view student list']);

        // Reviews
        Permission::create(['name' => 'moderate reviews']);
        Permission::create(['name' => 'submit reviews']);
        Permission::create(['name' => 'reply to reviews']);
        Permission::create(['name' => 'delete any review']);
        Permission::create(['name' => 'delete own reviews']);

        // Analytics
        Permission::create(['name' => 'view platform analytics']);
        Permission::create(['name' => 'view course analytics']);
        Permission::create(['name' => 'export analytics']);

        // User management
        Permission::create(['name' => 'create users']);
        Permission::create(['name' => 'edit users']);
        Permission::create(['name' => 'delete users']);
        Permission::create(['name' => 'assign roles']);

        // Assign permissions to roles

        // Super Admin gets everything
        $superAdmin = Role::findByName('super-admin');
        $superAdmin->givePermissionTo(Permission::all());

        // Admin
        $admin = Role::findByName('admin');
        $admin->givePermissionTo([
            'edit any course',
            'delete any course',
            'view any course',
            'publish any course',
            'feature courses',
            'set course pricing',
            'edit any chapter',
            'delete any chapter',
            'moderate reviews',
            'delete any review',
            'view platform analytics',
            'view course analytics',
            'export analytics',
            'create users',
            'edit users',
            'delete users',
            'assign roles',
            'view student list',
            'enroll students',
            'remove students',
            'view student progress'
        ]);

        // Teacher
        $teacher = Role::findByName('teacher');
        $teacher->givePermissionTo([
            'create courses',
            'edit own courses',
            'delete own courses',
            'view own courses',
            'publish own courses',
            'create chapters',
            'edit own chapters',
            'delete own chapters',
            'reorder chapters',
            'mark chapters as free',
            'upload videos',
            'manage attachments',
            'create quizzes',
            'edit quizzes',
            'view student progress',
            'view student list',
            'reply to reviews',
            'view course analytics'
        ]);

        // Student
        $student = Role::findByName('student');
        $student->givePermissionTo([
            'submit reviews',
            'delete own reviews'
        ]);
    }
}

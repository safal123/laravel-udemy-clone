<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // create roles
        Role::create(['name' => 'super-admin']);
        Role::create(['name' => 'admin']);
        Role::create(['name' => 'teacher']);
        Role::create(['name' => 'student']);

        // update cache to know about the newly created permissions (required if using WithoutModelEvents in seeders)
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // create permissions
        Permission::create(['name' => 'create course']);
        Permission::create(['name' => 'edit course']);
        Permission::create(['name' => 'delete course']);
        Permission::create(['name' => 'view course']);
        Permission::create(['name' => 'publish course']);
        Permission::create(['name' => 'unpublish course']);

        // assign permissions to roles
        $superAdmin = Role::findByName('super-admin');
        $superAdmin->givePermissionTo(Permission::all());
    }
}

<?php

namespace Database\Seeders;

use App\Models\Chapter;
use App\Models\Course;
use App\Models\User;
use Illuminate\Database\Seeder;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            CategorySeeder::class,
            RolesAndPermissionsSeeder::class,
            CourseSeeder::class,
        ]);


        User::factory()
            ->create([
                'name' => 'Safal Pokharel',
                'email' => 'safal@safal.com',
                'password' => bcrypt('password'),
            ])
            ->assignRole('super-admin') // Assign the role first
            ->each(function ($user) {
                // Create courses for the user
                Course::factory(20)
                    ->create(['user_id' => $user->id])
                    ->each(function ($course) {
                        // Create chapters for each course
                        Chapter::factory(5)->create(['course_id' => $course->id]);
                    });
            });

    }
}

<?php

namespace Database\Seeders;

use App\Models\Chapter;
use App\Models\Course;
use App\Models\Media;
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
        // First run the seeders that create roles and categories
        $this->call([
            CategorySeeder::class,
            RolesAndPermissionsSeeder::class,
        ]);

        // Create the super admin user first
        $user = User::factory()
            ->create([
                'name' => 'Safal Pokharel',
                'email' => 'safal@safal.com',
                'password' => bcrypt('password'),
            ])
            ->assignRole('super-admin');

        $learner = User::factory()
            ->create([
                'name' => 'Learner',
                'email' => 'learner@learner.com',
                'password' => bcrypt('password'),
            ])
            ->assignRole('student');

        // Create courses for the super admin
        Course::factory(20)
            ->create(['user_id' => $user->id])
            ->each(function ($course) {
                // Create chapters for each course
                Chapter::factory(5)
                    ->create(['course_id' => $course->id])
                    ->each(function ($chapter) {
                        // create single video media for each chapter
                        Media::factory()
                            ->video()
                            ->create([
                                'model_id' => $chapter->id,
                                'model_type' => Chapter::class,
                                'path' => 'https://laravel-udemy-clone-converted.s3.ap-southeast-2.amazonaws.com/courses/chapters/videos/9e40da81-4a6c-4684-885a-2f63ad06ceef/master.m3u8'
                            ]);
                    });

                // create media for each course 2-3 media
                Media::factory()
                    ->image()
                    ->create([
                        'model_id' => $course->id,
                        'model_type' => Course::class,
                        'created_at' => $course->created_at,
                        'updated_at' => $course->updated_at,
                    ]);
            });
    }
}

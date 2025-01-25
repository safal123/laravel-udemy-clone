<?php

namespace Database\Seeders;

use App\Models\Chapter;
use App\Models\Course;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Course::factory(10)
            ->create()
            ->each(function (Course $course) {
                Chapter::factory(5)->create([
                    'course_id' => $course->id,
                ]);
            });
    }
}

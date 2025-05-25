<?php

namespace Database\Seeders;

use App\Models\Chapter;
use App\Models\Course;
use App\Models\Media;
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
                Chapter::factory(5)
                    ->sequence(fn($sequence) => ['order' => $sequence->index + 1])
                    ->create(['course_id' => $course->id]);
            });
    }
}

<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Media;
use Illuminate\Database\Seeder;

class MediaSeeder extends Seeder
{
    public function run(): void
    {
        // Get all existing courses
        $courses = Course::all();

        if ($courses->isEmpty()) {
            $this->command->info('No courses found. Please run CourseSeeder first.');
            return;
        }

        // Create 2-3 media files for each course
        $courses->each(function ($course) {
            $mediaCount = rand(2, 3);

            for ($i = 0; $i < $mediaCount; $i++) {
                // Create a media file with random type
                $media = Media::factory()->create([
                    'model_type' => Course::class,
                    'model_id' => $course->id,
                    'created_at' => $course->created_at,
                    'updated_at' => $course->updated_at,
                ]);

                $this
                    ->command
                    ->info("Created {$media->type} media for course: {$course->title}");
            }
        });
    }
}

<?php

namespace App\Jobs;

use App\Models\Course;
use App\Models\User;
use App\Models\UserProgress;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Exception;

class CreateCourseProgressRecordsJob implements ShouldQueue
{
    use Queueable;

    public $tries = 3;

    public $backoff = 60;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public string $courseId,
        public string $userId,
    ) {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $userId = $this->userId;
        $courseId = $this->courseId;

        try {
            DB::transaction(function () use ($userId, $courseId) {
                // Create course-level progress
                UserProgress::create([
                    'user_id' => $userId,
                    'course_id' => $courseId,
                    'content_type' => 'course',
                    'progress_percentage' => 0,
                    'started_at' => now(),
                    'last_accessed_at' => now(),
                ]);

                // Create chapter-level progress for published chapters
                $chapters = Course::findOrFail($courseId)
                    ->chapters()
                    ->where('is_published', true)
                    ->get();

                // Batch insert for better performance
                $records = [];

                foreach ($chapters as $chapter) {
                    $records[] = [
                        'id' => (string) Str::uuid(),
                        'user_id' => $userId,
                        'course_id' => $courseId,
                        'chapter_id' => $chapter->id,
                        'content_type' => 'chapter',
                        'progress_percentage' => 0,
                        'is_completed' => false,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }

                if (! empty($records)) {
                    foreach (array_chunk($records, 100) as $chunk) {
                        UserProgress::insert($chunk);
                    }
                }
            });
        } catch (Exception $e) {
            Log::error('Failed to create course progress records', [
                'course_id' => $courseId,
                'user_id' => $userId,
                'error' => $e->getMessage(),
            ]);

            throw $e;
        }
    }
}

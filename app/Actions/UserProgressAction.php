<?php

namespace App\Actions;

use App\Models\UserProgress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserProgressAction
{
    /**
     * Store a new user progress record.
     *
     * @param Request $request
     * @return array
     */
    public function store(Request $request): array
    {
        $request->validate([
            'course_id' => 'required|uuid',
            'chapter_id' => 'required|uuid',
        ]);

        $existingProgress = UserProgress::where('user_id', Auth::id())
            ->where('course_id', $request->course_id)
            ->where('chapter_id', $request->chapter_id)
            ->whereNotNull('completed_at')
            ->where('is_completed', true)
            ->first();

        if ($existingProgress) {
            return [
                'status' => 'error',
                'message' => 'Chapter already marked as completed'
            ];
        }

        // Create a new progress record
        $progress = UserProgress::create([
            'user_id' => Auth::id(),
            'course_id' => $request->course_id,
            'chapter_id' => $request->chapter_id,
            'started_at' => now(),
            'last_accessed_at' => now(),
        ]);

        return [
            'status' => 'success',
            'message' => 'Chapter progress saved',
            'data' => $progress
        ];
    }

    /**
     * Update an existing user progress record.
     *
     * @param Request $request
     * @param UserProgress $userProgress
     * @return array
     */
    public function update(array $data, UserProgress $userProgress): array
    {
        $userProgress->update([
            'is_completed' => $data['is_completed'],
            'completed_at' => $data['is_completed'] ? now() : null,
            'last_accessed_at' => now(),
            'time_spent' => $data['time_spent'] ?? '',
            'progress_percentage' => $data['is_completed'] ? 100 : 0
        ]);

        $userProgress->refresh();

        // Calculate the progress percentage
        $this->calculateCourseProgressPercentage($userProgress);

        return [
            'status' => 'success',
            'message' => 'Chapter progress updated',
            'data' => $userProgress
        ];
    }

    private function calculateCourseProgressPercentage(UserProgress $userProgress): void
    {
        $course = $userProgress->course;
        $userId = $userProgress->user_id;
        $courseId = $course->id;

        // Get total chapters count
        $totalChapters = $course->chapters->count();

        if ($totalChapters === 0) {
            return; // Avoid division by zero
        }

        // Use a single query with count to get completed chapters
        $completedChapters = UserProgress::where([
            'course_id' => $courseId,
            'user_id' => $userId,
            'is_completed' => true,
            'content_type' => 'chapter'
        ])->count();

        // Calculate percentage
        $progressPercentage = round(($completedChapters / $totalChapters) * 100);

        // Update course progress in a single query
        UserProgress::updateOrCreate(
            [
                'course_id' => $courseId,
                'user_id' => $userId,
                'content_type' => 'course',
                'chapter_id' => null
            ],
            [
                'progress_percentage' => $progressPercentage,
                'last_accessed_at' => now()
            ]
        );
    }
}

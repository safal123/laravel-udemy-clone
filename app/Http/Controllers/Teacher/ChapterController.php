<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Inertia;
use App\Models\Chapter;
use App\Models\Course;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ChapterController extends Controller
{
    public function store(Course $course, Request $request): RedirectResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $course
            ->chapters()
            ->create($request->only('title', 'description'));

        return redirect()
            ->route('teachers.courses.edit', $course)
            ->with('success', 'Chapter created successfully.');
    }

    public function update(Course $course, Chapter $chapter, Request $request): RedirectResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);
        $chapter->update($request->all());
        return redirect()
            ->route('teachers.courses.edit', $course)
            ->with('success', 'Chapter updated successfully.');
    }

    public function addChapterVideo(Course $course, Chapter $chapter): \Illuminate\Http\JsonResponse
    {
        $chapter->update(['video_storage_id' => $chapter->id]);

        return response()->json([
            'message' => 'Chapter video added successfully.',
        ]);
    }

    public function togglePublish(Course $course, Chapter $chapter): RedirectResponse
    {
        if (!$chapter->video_storage_id) {
            return redirect()
                ->back()
                ->with('error', 'Please add a video to the chapter before publishing.');
        }

        \DB::transaction(function () use ($course, $chapter) {
            $chapter->update(['is_published' => !$chapter->is_published]);
            // Ensure the course is unpublished if no chapters are published
            if (!$course->hasPublishedChapter() && $course->is_published) {
                $course->update(['is_published' => false]);
            }
        });

        // Determine success message
        $status = $chapter->is_published ? 'published' : 'unpublished';

        return redirect()
            ->back()
            ->with('success', "Chapter '{$chapter->title}' {$status} successfully.");
    }


    public function toggleFree(Course $course, Chapter $chapter): RedirectResponse
    {
        $chapter->update(['is_free' => !$chapter->is_free]);
        $message = $chapter->is_free ? 'free' : 'paid';
        return redirect()
            ->back()
            ->with('success', "Chapter {$chapter->title} is now {$message}.");
    }

    public function destroy(Course $course, Chapter $chapter): RedirectResponse
    {
        $chapter->delete();
        return redirect()
            ->route('teachers.courses.edit', $course)
            ->with('success', 'Chapter deleted successfully.');
    }

    public function updateOrder(Request $request)
    {
        try {
            DB::transaction(function () use ($request) {
                $activePosition = $request->input('active_position');
                $overPosition = $request->input('over_position');

                $chapter1 = Chapter::find($activePosition);
                $chapter2 = Chapter::find($overPosition);

                if (!$chapter1 || !$chapter2) {
                    throw new \Exception('One or both chapters not found');
                }

                $tempValue = $chapter1->order;
                $chapter1->update(['order' => $chapter2->order]);
                $chapter2->update(['order' => $tempValue]);

                return response()->json(['success' => true, 'message' => 'Order swapped successfully']);
            });
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}

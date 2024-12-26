<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Inertia;
use App\Models\Chapter;
use App\Models\Course;
use Illuminate\Http\Request;

class ChapterController extends Controller
{
    public function store(Course $course, Request $request)
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

    public function update(Course $course, Chapter $chapter, Request $request)
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

    public function addChapterVideo(Course $course, Chapter $chapter)
    {
        $chapter->update(['video_storage_id' => $chapter->id]);

        return response()->json([
            'message' => 'Chapter video added successfully.',
        ]);
    }

    public function togglePublish(Course $course, Chapter $chapter)
    {
        // check if the chapter has a video
        if (!$chapter->video_storage_id) {
            return response()->json([
                'message' => 'Please add a video to the chapter first.',
            ], 422);
        }
        $chapter->update(['is_published' => !$chapter->is_published]);

        return response()->json([
            'message' => 'Chapter publish status updated successfully.',
        ]);
    }

    public function toggleFree(Course $course, Chapter $chapter)
    {
        $chapter->update(['is_free' => !$chapter->is_free]);

        return response()->json([
            'message' => 'Chapter free status updated successfully.',
        ]);
    }

    public function destroy(Course $course, Chapter $chapter): \Illuminate\Http\RedirectResponse
    {
        $chapter->delete();

        return redirect()
            ->route('teachers.courses.edit', $course)
            ->with('success', 'Chapter deleted successfully.');
    }

    public function show(Course $course, Chapter $chapter)
    {
        return Inertia::render('Course/Show/Index', [
            'course' => $course,
            'chapter' => $chapter,
        ]);
    }
}

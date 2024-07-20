<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

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
            ->create($request->all());

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

    public function destroy(Course $course, Chapter $chapter)
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

<?php

namespace App\Http\Controllers;

use App\Http\Resources\ChapterResource;
use App\Models\Chapter;
use App\Models\Course;
use Inertia\Inertia;

class ChapterController extends Controller
{
    public function show()
    {
        $courseSlug = request()->route('course');
        $chapterId = request()->route('chapter');
        $course = Course::query()
            ->where('slug', $courseSlug)
            // only show published chapters
            ->with(['chapters' => function ($query) {
                $query->where('is_published', true);
            }])
            ->firstOrFail();
        $chapter = Chapter::query()
            ->where('id', $chapterId)
            ->where('is_published', true)
            ->where('course_id', $course->id)
            ->with(['course'])
            ->firstOrFail();

        return Inertia::render('Course/Show/Chapter/Index', [
            'course' => $course,
            'chapter' => new ChapterResource($chapter),
            'nextChapter' => $chapter->next(),
            'previousChapter' => $chapter->previous(),
        ]);
    }
}

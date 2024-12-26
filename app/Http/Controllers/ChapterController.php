<?php

namespace App\Http\Controllers;

use App\Http\Resources\ChapterResource;
use App\Models\Chapter;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChapterController extends Controller
{
    public function show()
    {
        $courseSlug = request()->route('course');
        $chapterId = request()->route('chapter');
        $course = Course::query()
            ->where('slug', $courseSlug)
            ->with('chapters')
            ->firstOrFail();
        $chapter = Chapter::query()
            ->where('id', $chapterId)
            ->with(['course.chapters' => function ($query) {
                $query
                    ->select('id', 'course_id', 'title', 'order')
                    ->orderBy('order');
            }])
            ->get();
        return Inertia::render('Course/Show/Chapter/Index', [
            'course' => $course,
            'chapter' => ChapterResource::collection($chapter),
        ]);
    }
}

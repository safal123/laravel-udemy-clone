<?php

namespace App\Http\Controllers;

use App\Http\Resources\ChapterResource;
use App\Http\Resources\CourseResource;
use App\Models\Chapter;
use App\Models\Course;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ChapterController extends Controller
{
    public function show(): Response
    {
        $userId = Auth::id();
        $courseSlug = request()->route('course');
        $chapterId = request()->route('chapter');

        // Get course with chapters and progress
        $course = Course::query()
            ->where('slug', $courseSlug)
            ->with([
                'chapters' => function ($query) use ($userId) {
                    $query
                        ->where('is_published', true)
                        ->with([
                            'progress' => fn($q) =>
                            $q->where('user_id', $userId)
                                ->where('content_type', 'chapter')
                                ->limit(1)
                        ]);
                }
            ])
            ->addSelect(['progress_percentage' => function ($query) use ($userId) {
                $query->select('progress_percentage')
                    ->from('user_progress')
                    ->whereColumn('course_id', 'courses.id')
                    ->where('user_id', $userId)
                    ->where('content_type', 'course')
                    ->limit(1);
            }])
            ->firstOrFail();

        // Get chapter with related data
        $chapter = Chapter::query()
            ->where('id', $chapterId)
            ->where('is_published', true)
            ->where('course_id', $course->id)
            ->with([
                'course',
                // Only select the latest media
                'media' => function ($query) use ($chapterId) {
                    $query
                        ->whereNotNull('path')
                        ->where('type', 'video')
                        // ->where('mime_type', 'video/m3u8')
                        // ->where('file_name', 'like', '%' . $chapterId . '.m3u8')
                        ->orderBy('created_at', 'desc')->limit(1);
                }
            ])
            ->addSelect([
                'is_completed' => function ($query) {
                    $query->selectRaw('count(*)')
                        ->from('user_progress')
                        ->whereColumn('user_progress.chapter_id', 'chapters.id')
                        ->where('user_progress.user_id', auth()->id())
                        ->where('user_progress.is_completed', true)
                        ->limit(1);
                },
            ])
            ->addSelect([
                'next_chapter_id' => function ($query) use ($course) {
                    $query->select('id')
                        ->from('chapters as next_chapters')
                        ->whereColumn('next_chapters.course_id', 'chapters.course_id')
                        ->where('next_chapters.course_id', $course->id)
                        ->where('next_chapters.is_published', true)
                        ->whereColumn('next_chapters.order', '>', 'chapters.order')
                        ->orderBy('next_chapters.order')
                        ->limit(1);
                },
                'previous_chapter_id' => function ($query) use ($course) {
                    $query->select('id')
                        ->from('chapters as prev_chapters')
                        ->whereColumn('prev_chapters.course_id', 'chapters.course_id')
                        ->where('prev_chapters.course_id', $course->id)
                        ->where('prev_chapters.is_published', true)
                        ->whereColumn('prev_chapters.order', '<', 'chapters.order')
                        ->orderByDesc('prev_chapters.order')
                        ->limit(1);
                },
            ])
            ->with('progress', function ($query) {
                $query->where('user_id', auth()->id());
            })
            ->firstOrFail();

        $chapter->progress()->updateOrCreate([
            'user_id' => auth()->id(),
            'course_id' => $course->id,
        ], [
            'last_accessed_at' => now(),
            'started_at' => now(),
        ]);

        return Inertia::render('Course/Show/Chapter/Index', [
            'course' => new CourseResource($course),
            'chapter' => new ChapterResource($chapter),
        ]);
    }
}

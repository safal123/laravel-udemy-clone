<?php

namespace App\Http\Controllers\Teacher;

use App\Events\ChapterVideoUploaded;
use App\Http\Controllers\Controller;
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
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|nullable|string',
            'is_free' => 'sometimes|required|boolean',
            'is_published' => 'sometimes|required|boolean',
        ]);

        $chapter->update($validated);

        return redirect()
            ->route('teachers.courses.edit', $course)
            ->with('success', 'Chapter updated successfully.');
    }

    public function addChapterVideo(Course $course, Chapter $chapter, Request $request): \Illuminate\Http\JsonResponse
    {
        $chapter->update(['video_storage_id' => $chapter->id]);
        $chapter->refresh();
        /*
        * This is hacky, but it works for now.
        */
        $path = 'https://laravel-udemy-clone-converted.s3.ap-southeast-2.amazonaws.com/courses/chapters/videos/' . $chapter->id;

        // TODO: Move this code to a service and handle multiple files
        // TODO: Handle the case where the video is already uploaded
        // TODO: Handle the case where the video is not uploaded
        $media = $chapter->media()->updateOrCreate([
            'type' => 'video',
            'model_id' => $chapter->id,
        ], [
            'file_name' => $chapter->id . '.m3u8',
            'path' =>  $path . '/master.m3u8',
            'type' => $request->type ?? 'video',
            'mime_type' => $request->mime_type ?? 'video/m3u8',
            'size' => $request->size ?? 0,
            'duration' => $request->duration ?? 0,
            'created_by' => auth()->user()->id,
            'status' => 'pending',
            'metadata' => [
                'sprite_sheet_path' => $path . '/' . $chapter->id . '_spritesheet.jpg',
                'storage_id' => $chapter->id,
                'thumbnail_path' => $path . '/' . $chapter->id . '_thumbnail.jpg',
                'uploaded_at' => now(),
                'uploaded_by' => auth()->user()->id,
                'uploaded_by_name' => auth()->user()->name,
                'model_type' => 'chapter',
                'model_id' => $chapter->id,
            ],
        ]);

        event(new ChapterVideoUploaded($chapter));

        return response()->json([
            'message' => 'Chapter video added successfully.',
            'media' => $media,
        ]);
    }

    public function togglePublish(Course $course, Chapter $chapter): RedirectResponse
    {
        if (! $chapter->video_storage_id) {
            return redirect()
                ->back()
                ->with('error', 'Please add a video to the chapter before publishing.');
        }

        \DB::transaction(function () use ($course, $chapter) {
            $chapter->update(['is_published' => ! $chapter->is_published]);
            // Ensure the course is unpublished if no chapters are published
            if (! $course->hasPublishedChapter() && $course->is_published) {
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
        $chapter->update(['is_free' => ! $chapter->is_free]);
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
                $activeUuid = $request->input('active_position');
                $overUuid = $request->input('over_position');

                // Find chapters by UUID
                $chapterToMove = Chapter::where('id', $activeUuid)->first();
                $targetChapter = Chapter::where('id', $overUuid)->first();

                if (! $chapterToMove || ! $targetChapter) {
                    throw new \Exception('One or both chapters not found');
                }

                $currentOrder = $chapterToMove->order;
                $targetOrder = $targetChapter->order;

                // Reorder chapters
                if ($currentOrder < $targetOrder) {
                    // Moving down: Shift items up
                    Chapter::whereBetween('order', [$currentOrder + 1, $targetOrder])
                        ->decrement('order');
                } elseif ($currentOrder > $targetOrder) {
                    // Moving up: Shift items down
                    Chapter::whereBetween('order', [$targetOrder, $currentOrder - 1])
                        ->increment('order');
                }

                // Update the moved chapter's order
                $chapterToMove->update(['order' => $targetOrder]);
            });

            return redirect()
                ->back()
                ->with('success', 'Chapters reordered successfully.');
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\UserProgress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class UserProgressController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'course_id' => 'required|uuid',
            'chapter_id' => 'required|uuid',
        ]);

        $existingProgress = UserProgress::where('user_id', auth()->id())
            ->where('course_id', $request->course_id)
            ->where('chapter_id', $request->chapter_id)
            ->whereNotNull('completed_at')
            ->where('is_completed', true)
            ->first();

        if ($existingProgress) {
            return Redirect::back()
                ->withErrors('Chapter already marked as completed');
        }
        // Create a new progress record
        UserProgress::create([
            'user_id' => auth()->id(),
            'course_id' => $request->course_id,
            'chapter_id' => $request->chapter_id,
            'started_at' => now(),
            'last_accessed_at' => now(),
        ]);

        return Redirect::back()->with('success', 'Chapter progress saved');
    }

    public function update(Request $request, UserProgress $userProgress)
    {
        $request->validate([
            'is_completed' => 'required|boolean',
        ]);

        $userProgress->update($request->all());

        $userProgress->refresh();

        return Redirect::back()->with('success', 'Chapter progress updated');
    }
}

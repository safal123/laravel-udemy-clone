<?php

namespace App\Http\Controllers;

use App\Actions\UserProgressAction;
use App\Models\UserProgress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class UserProgressController extends Controller
{
    public function __construct(
        protected UserProgressAction $action
    ) {}

    public function store(Request $request)
    {
        $validated = $request->validate([
            'course_id' => 'required|uuid',
            'chapter_id' => 'required|uuid',
        ]);

        $result = $this->action->store(
            $validated['course_id'],
            $validated['chapter_id'],
            Auth::user()
        );

        if ($result['status'] === 'error') {
            return Redirect::back()->withErrors($result['message']);
        }

        return Redirect::back()->with('success', $result['message']);
    }

    public function update(Request $request, UserProgress $userProgress)
    {
        $validated = $request->validate([
            'is_completed' => 'required|boolean',
            'time_spent' => 'nullable|string',
        ]);

        $result = $this->action->update($validated, $userProgress);

        return Redirect::back()->with('success', $result['message']);
    }
}

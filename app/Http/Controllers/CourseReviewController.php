<?php

namespace App\Http\Controllers;

use App\Actions\Course\CourseReviewAction;
use App\Models\Course;
use App\Models\CourseReview;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class CourseReviewController extends Controller
{
    protected CourseReviewAction $action;

    public function __construct(CourseReviewAction $action)
    {
        $this->action = $action;
    }

    /**
     * Store a newly created review in storage.
     */
    public function store(Request $request, Course $course)
    {
        $this->authorize('review', $course);

        // Validate request
        $validated = $request->validate(CourseReviewAction::rules());

        try {
            $this->action->store($validated, $course, Auth::user());
            return back()->with('success', 'Your review has been submitted successfully');
        } catch (ValidationException $e) {
            return back()->withErrors($e->errors());
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'An unexpected error occurred.']);
        }
    }

    /**
     * Update the specified review in storage.
     */
    public function update(Request $request, Course $course)
    {
        // Validate request
        $validated = $request->validate(CourseReviewAction::rules());

        try {
            $this->action->update($validated, $course, Auth::user());
            return redirect()->route('courses.show', $course->slug)
                ->with('success', 'Your review has been updated successfully');
        } catch (ValidationException $e) {
            return back()->withErrors($e->errors());
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'An unexpected error occurred.']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course, CourseReview $review)
    {
        try {
            $this->action->destroy($course, $review);
            return back()->with('success', 'Your review has been deleted successfully');
        } catch (ValidationException $e) {
            return back()->withErrors($e->errors());
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'An unexpected error occurred.']);
        }
    }

    /**
     * Mark a review as helpful by incrementing the helpful_count.
     */
    public function markHelpful(CourseReview $review)
    {
        try {
            $this->action->markHelpful($review);
            return back()->with('success', 'Review marked as helpful');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'An unexpected error occurred.']);
        }
    }
}

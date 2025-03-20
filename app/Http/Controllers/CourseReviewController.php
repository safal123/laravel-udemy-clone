<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\CourseReview;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CourseReviewController extends Controller
{
    /**
     * Store a newly created review in storage.
     */
    public function store(Request $request, Course $course)
    {
        $this->authorize('review', $course);

        // Validate request
        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'title' => 'required|string|min:3|max:100',
            'comment' => 'required|string|min:10|max:1000',
        ]);

        CourseReview::create([
            'user_id' => Auth::id(),
            'course_id' => $course->id,
            'rating' => $validated['rating'],
            'title' => $validated['title'],
            'comment' => $validated['comment'],
        ]);

        // Refresh the course rating
        $this->updateCourseRating($course);

        return back()->with('success', 'Your review has been submitted successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Course $course)
    {
        $reviews = CourseReview::where('course_id', $course->id)
            ->with(['user:id,name,email,profile_photo_url'])
            ->orderBy('helpful_count', 'desc')
            ->orderBy('created_at', 'desc')
            ->paginate(5);

        return Inertia::render('Course/Reviews/Show', [
            'course' => $course,
            'reviews' => $reviews,
        ]);
    }

    /**
     * Show the form for editing the review.
     */
    public function edit(Course $course)
    {
        $review = CourseReview::where('user_id', Auth::id())
            ->where('course_id', $course->id)
            ->firstOrFail();

        return Inertia::render('Course/Review/Edit', [
            'course' => $course,
            'review' => $review,
        ]);
    }

    /**
     * Update the specified review in storage.
     */
    public function update(Request $request, Course $course)
    {
        // Get the review or fail
        $review = CourseReview::where('user_id', Auth::id())
            ->where('course_id', $course->id)
            ->firstOrFail();

        // Validate request
        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'title' => 'required|string|min:3|max:100',
            'comment' => 'required|string|min:10|max:1000',
        ]);

        // Update review
        $review->rating = $validated['rating'];
        $review->title = $validated['title'];
        $review->comment = $validated['comment'];
        $review->save();

        // Refresh the course rating
        $this->updateCourseRating($course);

        return redirect()->route('courses.show', $course->slug)
            ->with('success', 'Your review has been updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    /**
     * Mark a review as helpful by incrementing the helpful_count.
     */
    public function markHelpful(CourseReview $review)
    {
        $review->increment('helpful_count');

        return back();
    }

    /**
     * Update the course's average rating.
     */
    private function updateCourseRating(Course $course)
    {
        // This method would typically update a cached value or recalculate
        // the average rating for the course.
        // For now, we'll rely on the averageRating() method in the Course model
    }
}

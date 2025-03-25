<?php

namespace App\Actions\Course;

use App\Mail\ReviewThanks;
use App\Models\Course;
use App\Models\CourseReview;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class CourseReviewAction
{
    /**
     * Store a new course review.
     *
     * @param array $data Validated review data
     * @param Course $course The course being reviewed
     * @param User $user The user submitting the review
     * @return CourseReview
     */
    public function store(array $data, Course $course, User $user): CourseReview
    {
        $review = CourseReview::create([
            'user_id' => $user->id,
            'course_id' => $course->id,
            'rating' => $data['rating'],
            'title' => $data['title'],
            'comment' => $data['comment'],
        ]);

        // TODO: Refresh the course rating

        // Send email to user
        Mail::to($user->email)
            ->send(new ReviewThanks($user, $course));

        return $review;
    }

    /**
     * Update an existing course review.
     *
     * @param array $data Validated review data
     * @param Course $course The course being reviewed
     * @param User $user The user updating the review
     * @return CourseReview
     * @throws ValidationException
     */
    public function update(array $data, Course $course, User $user): CourseReview
    {
        // Get the review or fail
        $review = CourseReview::where('user_id', $user->id)
            ->where('course_id', $course->id)
            ->first();

        if (!$review) {
            throw ValidationException::withMessages([
                'review' => 'You have not reviewed this course yet.'
            ]);
        }

        // Update review
        $review->update([
            'rating' => $data['rating'],
            'title' => $data['title'],
            'comment' => $data['comment'],
        ]);

        return $review;
    }

    /**
     * Delete a course review.
     *
     * @param Course $course
     * @param CourseReview $review
     * @return bool
     * @throws ValidationException
     */
    public function destroy(Course $course, CourseReview $review): bool
    {
        if ($review->course_id !== $course->id) {
            throw ValidationException::withMessages([
                'review' => 'This review does not belong to the specified course.'
            ]);
        }

        return $review->delete();
    }

    /**
     * Mark a review as helpful.
     *
     * @param CourseReview $review
     * @return CourseReview
     */
    public function markHelpful(CourseReview $review): CourseReview
    {
        $review->increment('helpful_count');
        return $review->fresh();
    }

    /**
     * Get validation rules for course reviews.
     *
     * @return array<string, mixed>
     */
    public static function rules(): array
    {
        return [
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'title' => ['required', 'string', 'min:3', 'max:100'],
            'comment' => ['required', 'string', 'min:10', 'max:1000'],
        ];
    }
}

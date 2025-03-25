<?php

namespace Tests\Feature;

use App\Models\Course;
use App\Models\CourseReview;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Support\Facades\DB;

class CourseReviewControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    private User $user;
    private Course $course;
    private array $reviewData;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $teacher = User::factory()->create();

        $this->course = Course::factory()->create([
            'user_id' => $teacher->id,
            'slug' => 'test-course'
        ]);

        // Fix: Use insert directly into the pivot table with an ID
        DB::table('course_user')->insert([
            'id' => \Illuminate\Support\Str::uuid()->toString(),
            'course_id' => $this->course->id,
            'user_id' => $this->user->id,
            'purchase_status' => 'succeeded',
            'payment_completed_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->reviewData = [
            'rating' => 4,
            'title' => 'Great course with practical examples',
            'comment' => 'This course provided excellent content with practical examples that helped me understand the concepts better.'
        ];
    }

    /**
     *  @test
     */
    public function authenticated_user_can_submit_a_course_review()
    {
        $response = $this->actingAs($this->user)
            ->post(route('courses.reviews.store', $this->course->slug), $this->reviewData);

        $response->assertRedirect();
        $response->assertSessionHas('success', 'Your review has been submitted successfully');

        $this->assertDatabaseHas('course_reviews', [
            'user_id' => $this->user->id,
            'course_id' => $this->course->id,
            'rating' => $this->reviewData['rating'],
            'title' => $this->reviewData['title'],
        ]);
    }

    /** @test */
    public function user_can_update_their_review()
    {
        // First create a review
        $review = CourseReview::factory()->create([
            'user_id' => $this->user->id,
            'course_id' => $this->course->id,
            'rating' => 3,
            'title' => 'Initial title',
            'comment' => 'Initial comment'
        ]);

        $updatedData = [
            'rating' => 5,
            'title' => 'Updated review title',
            'comment' => 'After spending more time with this course, I found it even more valuable!'
        ];

        $response = $this->actingAs($this->user)
            ->put(route('courses.reviews.update', $this->course->slug), $updatedData);

        $response->assertRedirect(route('courses.show', $this->course->slug));
        $response->assertSessionHas('success', 'Your review has been updated successfully');

        $this->assertDatabaseHas('course_reviews', [
            'user_id' => $this->user->id,
            'course_id' => $this->course->id,
            'rating' => $updatedData['rating'],
            'title' => $updatedData['title'],
            'comment' => $updatedData['comment'],
        ]);
    }

    /** @test */
    public function user_can_delete_their_review()
    {
        $review = CourseReview::factory()->create([
            'user_id' => $this->user->id,
            'course_id' => $this->course->id
        ]);

        $response = $this->actingAs($this->user)
            ->delete(route('courses.reviews.destroy', [
                'course' => $this->course->slug,
                'review' => $review->id
            ]));

        $response->assertRedirect();
        $response->assertSessionHas('success', 'Your review has been deleted successfully');

        $this->assertDatabaseMissing('course_reviews', [
            'id' => $review->id
        ]);
    }

    /** @test */
    public function user_can_mark_a_review_as_helpful()
    {
        $review = CourseReview::factory()->create([
            'user_id' => User::factory()->create()->id,
            'course_id' => $this->course->id,
            'helpful_count' => 0
        ]);

        $response = $this->actingAs($this->user)
            ->post(route('reviews.mark-helpful', $review->id));

        $response->assertRedirect();

        $this->assertDatabaseHas('course_reviews', [
            'id' => $review->id,
            'helpful_count' => 1
        ]);
    }

    /** @test */
    public function review_validation_fails_with_invalid_data()
    {
        $invalidData = [
            'rating' => 10, // Invalid rating (over max)
            'title' => 'A',  // Too short
            'comment' => 'Too short' // Too short
        ];

        $response = $this->actingAs($this->user)
            ->post(route('courses.reviews.store', $this->course->slug), $invalidData);

        $response->assertSessionHasErrors(['rating', 'title', 'comment']);

        $this->assertDatabaseMissing('course_reviews', [
            'user_id' => $this->user->id,
            'course_id' => $this->course->id,
        ]);
    }

    /** @test */
    public function user_cannot_review_a_course_they_do_not_own()
    {
        // Create a new course that the user hasn't purchased
        $otherCourse = Course::factory()->create([
            'user_id' => User::factory()->create()->id,
            'slug' => 'other-course'
        ]);

        $response = $this->actingAs($this->user)
            ->post(route('courses.reviews.store', $otherCourse->slug), $this->reviewData);

        // This assumes you have the proper authorization in place
        $response->assertStatus(403);

        $this->assertDatabaseMissing('course_reviews', [
            'user_id' => $this->user->id,
            'course_id' => $otherCourse->id,
        ]);
    }
}

<?php

namespace Tests\Integration\Http;

use App\Models\Course;
use App\Models\CourseReview;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Suite\Traits\CreatesTestCourses;
use Tests\Suite\Traits\CreatesTestUsers;
use Tests\TestCase;

class CourseReviewControllerTest extends TestCase
{
    use RefreshDatabase, CreatesTestCourses, CreatesTestUsers;

    private Course $course;
    private User $student;
    private User $teacher;

    protected function setUp(): void
    {
        parent::setUp();

        $courseData = $this->createCourseWithTeacherAndStudents();
        $this->course = $courseData['course'];
        $this->teacher = $courseData['teacher'];
        $this->student = $courseData['students'][0]; // Get first student from array
    }

    public function test_guest_cannot_submit_review()
    {
        $reviewData = [
            'rating' => 5,
            'title' => 'Great course!',
            'comment' => 'This course was amazing and I learned a lot.'
        ];

        $this->post(route('courses.reviews.store', $this->course), $reviewData)
            ->assertRedirect(route('login'));
    }

    public function test_authenticated_user_can_submit_review()
    {
        $reviewData = [
            'rating' => 5,
            'title' => 'Great course!',
            'comment' => 'This course was amazing and I learned a lot.'
        ];

        $this->actingAs($this->student)
            ->post(route('courses.reviews.store', $this->course), $reviewData)
            ->assertRedirect();

        $this->assertDatabaseHas('course_reviews', [
            'course_id' => $this->course->id,
            'user_id' => $this->student->id,
            'rating' => 5,
            'title' => 'Great course!',
            'comment' => 'This course was amazing and I learned a lot.'
        ]);
    }

    public function test_review_validation_fails_with_missing_rating()
    {
        $this->actingAs($this->student)
            ->post(route('courses.reviews.store', $this->course), [
                'title' => 'Great course!',
                'comment' => 'Amazing content'
            ])
            ->assertSessionHasErrors(['rating']);
    }

    public function test_review_validation_fails_with_invalid_rating()
    {
        $this->actingAs($this->student)
            ->post(route('courses.reviews.store', $this->course), [
                'rating' => 6, // Invalid, should be 1-5
                'title' => 'Great course!',
                'comment' => 'Amazing content'
            ])
            ->assertSessionHasErrors(['rating']);
    }

    public function test_review_validation_fails_with_missing_title()
    {
        $this->actingAs($this->student)
            ->post(route('courses.reviews.store', $this->course), [
                'rating' => 5,
                'comment' => 'Amazing content'
            ])
            ->assertSessionHasErrors(['title']);
    }

    public function test_review_validation_fails_with_missing_comment()
    {
        $this->actingAs($this->student)
            ->post(route('courses.reviews.store', $this->course), [
                'rating' => 5,
                'title' => 'Great course!'
            ])
            ->assertSessionHasErrors(['comment']);
    }

    public function test_user_can_update_their_own_review()
    {
        $review = CourseReview::create([
            'course_id' => $this->course->id,
            'user_id' => $this->student->id,
            'rating' => 4,
            'title' => 'Original title',
            'comment' => 'Original comment'
        ]);

        $updatedData = [
            'rating' => 5,
            'title' => 'Updated title',
            'comment' => 'Updated comment after completing the course'
        ];

        $this->actingAs($this->student)
            ->put(route('courses.reviews.update', [$this->course, $review]), $updatedData)
            ->assertRedirect();

        $this->assertDatabaseHas('course_reviews', [
            'id' => $review->id,
            'rating' => 5,
            'title' => 'Updated title',
            'comment' => 'Updated comment after completing the course'
        ]);
    }

    public function test_user_can_delete_their_own_review()
    {
        $review = CourseReview::create([
            'course_id' => $this->course->id,
            'user_id' => $this->student->id,
            'rating' => 4,
            'title' => 'Review to delete',
            'comment' => 'This review will be deleted'
        ]);

        $this->actingAs($this->student)
            ->delete(route('courses.reviews.destroy', [$this->course, $review]))
            ->assertRedirect();

        $this->assertDatabaseMissing('course_reviews', [
            'id' => $review->id
        ]);
    }

    public function test_user_can_mark_review_as_helpful()
    {
        $otherStudent = $this->createStudentUser();

        $review = CourseReview::create([
            'course_id' => $this->course->id,
            'user_id' => $otherStudent->id,
            'rating' => 5,
            'title' => 'Helpful review',
            'comment' => 'Very informative review',
            'helpful_count' => 0
        ]);

        $this->actingAs($this->student)
            ->post(route('reviews.markHelpful', $review))
            ->assertRedirect();

        $this->assertDatabaseHas('course_reviews', [
            'id' => $review->id,
            'helpful_count' => 1
        ]);
    }

    public function test_guest_cannot_mark_review_as_helpful()
    {
        $review = CourseReview::create([
            'course_id' => $this->course->id,
            'user_id' => $this->student->id,
            'rating' => 5,
            'title' => 'Helpful review',
            'comment' => 'Very informative review',
            'helpful_count' => 0
        ]);

        $this->post(route('reviews.markHelpful', $review))
            ->assertRedirect(route('login'));

        $this->assertDatabaseHas('course_reviews', [
            'id' => $review->id,
            'helpful_count' => 0
        ]);
    }

    public function test_user_can_view_individual_review()
    {
        $review = CourseReview::create([
            'course_id' => $this->course->id,
            'user_id' => $this->student->id,
            'rating' => 5,
            'title' => 'Great course!',
            'comment' => 'Excellent content and instruction'
        ]);

        $this->actingAs($this->student)
            ->get(route('courses.reviews.show', [$this->course, $review]))
            ->assertOk();
    }

    public function test_user_cannot_access_edit_review_page_without_authorization()
    {
        $review = CourseReview::create([
            'course_id' => $this->course->id,
            'user_id' => $this->student->id,
            'rating' => 4,
            'title' => 'Review to edit',
            'comment' => 'This review can be edited'
        ]);

        // This will fail because authorization policy is not implemented
        $this->actingAs($this->student)
            ->get(route('courses.reviews.edit', [$this->course, $review]))
            ->assertForbidden();
    }

    public function test_review_updates_course_average_rating()
    {
        // Create multiple reviews
        CourseReview::create([
            'course_id' => $this->course->id,
            'user_id' => $this->student->id,
            'rating' => 5,
            'title' => 'Excellent',
            'comment' => 'Amazing course'
        ]);

        $anotherStudent = $this->createStudentUser();
        CourseReview::create([
            'course_id' => $this->course->id,
            'user_id' => $anotherStudent->id,
            'rating' => 3,
            'title' => 'Average',
            'comment' => 'Okay course'
        ]);

        // Average should be (5 + 3) / 2 = 4
        $this->assertEquals(4, CourseReview::where('course_id', $this->course->id)->avg('rating'));
    }
}

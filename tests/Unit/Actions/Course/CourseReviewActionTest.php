<?php

namespace Tests\Unit\Actions\Course;

use App\Actions\Course\CourseReviewAction;
use App\Mail\ReviewThanks;
use App\Models\Course;
use App\Models\CourseReview;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

class CourseReviewActionTest extends TestCase
{
  use RefreshDatabase;

  private CourseReviewAction $action;
  private User $user;
  private Course $course;

  protected function setUp(): void
  {
    parent::setUp();

    $this->action = new CourseReviewAction();
    $this->user = User::factory()->create();
    $this->course = Course::factory()->create([
      'user_id' => User::factory()->create()->id
    ]);
  }

  /** @test */
  public function it_can_store_a_new_review()
  {
    Mail::fake();

    $data = [
      'rating' => 5,
      'title' => 'Great course',
      'comment' => 'This course was very helpful and informative.'
    ];

    $review = $this->action->store($data, $this->course, $this->user);

    $this->assertInstanceOf(CourseReview::class, $review);
    $this->assertEquals($this->user->id, $review->user_id);
    $this->assertEquals($this->course->id, $review->course_id);
    $this->assertEquals($data['rating'], $review->rating);
    $this->assertEquals($data['title'], $review->title);
    $this->assertEquals($data['comment'], $review->comment);

    Mail::assertSent(ReviewThanks::class, function ($mail) {
      return $mail->hasTo($this->user->email) &&
        $mail->user->id === $this->user->id &&
        $mail->course->id === $this->course->id;
    });
  }

  /** @test */
  public function it_can_update_an_existing_review()
  {
    // Create an initial review
    $review = CourseReview::factory()->create([
      'user_id' => $this->user->id,
      'course_id' => $this->course->id,
      'rating' => 3,
      'title' => 'Initial title',
      'comment' => 'Initial comment'
    ]);

    $data = [
      'rating' => 4,
      'title' => 'Updated title',
      'comment' => 'Updated comment with more details and information'
    ];

    $updatedReview = $this->action->update($data, $this->course, $this->user);

    $this->assertInstanceOf(CourseReview::class, $updatedReview);
    $this->assertEquals($this->user->id, $updatedReview->user_id);
    $this->assertEquals($this->course->id, $updatedReview->course_id);
    $this->assertEquals($data['rating'], $updatedReview->rating);
    $this->assertEquals($data['title'], $updatedReview->title);
    $this->assertEquals($data['comment'], $updatedReview->comment);
  }

  /** @test */
  public function update_throws_exception_when_review_does_not_exist()
  {
    $data = [
      'rating' => 4,
      'title' => 'Updated title',
      'comment' => 'Updated comment'
    ];

    $this->expectException(ValidationException::class);
    $this->expectExceptionMessage('You have not reviewed this course yet.');

    $this->action->update($data, $this->course, $this->user);
  }

  /** @test */
  public function it_can_delete_a_review()
  {
    $review = CourseReview::factory()->create([
      'user_id' => $this->user->id,
      'course_id' => $this->course->id
    ]);

    $result = $this->action->destroy($this->course, $review);

    $this->assertTrue($result);
    $this->assertDatabaseMissing('course_reviews', [
      'id' => $review->id
    ]);
  }

  /** @test */
  public function destroy_throws_exception_when_review_does_not_belong_to_course()
  {
    $otherCourse = Course::factory()->create([
      'user_id' => User::factory()->create()->id
    ]);

    $review = CourseReview::factory()->create([
      'user_id' => $this->user->id,
      'course_id' => $otherCourse->id
    ]);

    $this->expectException(ValidationException::class);
    $this->expectExceptionMessage('This review does not belong to the specified course.');

    $this->action->destroy($this->course, $review);
  }

  /** @test */
  public function it_can_mark_a_review_as_helpful()
  {
    $review = CourseReview::factory()->create([
      'user_id' => $this->user->id,
      'course_id' => $this->course->id,
      'helpful_count' => 5
    ]);

    $updatedReview = $this->action->markHelpful($review);

    $this->assertEquals(6, $updatedReview->helpful_count);
  }

  /** @test */
  public function rules_method_returns_expected_validation_rules()
  {
    $rules = CourseReviewAction::rules();

    $this->assertIsArray($rules);
    $this->assertArrayHasKey('rating', $rules);
    $this->assertArrayHasKey('title', $rules);
    $this->assertArrayHasKey('comment', $rules);

    $this->assertContains('required', $rules['rating']);
    $this->assertContains('integer', $rules['rating']);
    $this->assertContains('min:1', $rules['rating']);
    $this->assertContains('max:5', $rules['rating']);

    $this->assertContains('required', $rules['title']);
    $this->assertContains('string', $rules['title']);
    $this->assertContains('min:3', $rules['title']);
    $this->assertContains('max:100', $rules['title']);

    $this->assertContains('required', $rules['comment']);
    $this->assertContains('string', $rules['comment']);
    $this->assertContains('min:10', $rules['comment']);
    $this->assertContains('max:1000', $rules['comment']);
  }
}

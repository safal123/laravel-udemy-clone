<?php

namespace App\Actions\Stripe;

use App\Models\Course;
use App\Models\CourseUser;
use App\Models\User;
use Exception;

class StripeClientSecret
{
    /**
     * Create a payment intent for course enrollment and return client secret
     *
     * @param User $user
     * @param int $courseId
     * @return array
     * @throws Exception
     */
    public function createPaymentIntent(User $user, Course $course): array
    {
        // Create or retrieve enrollment record
        $courseUser = CourseUser::firstOrCreate(
            ['user_id' => $user->id, 'course_id' => $course->id],
            ['purchase_status' => 'initiated']
        );

        // Create payment intent
        $paymentIntent = $user->pay(
            $this->calculateAmount($course->price),
            $this->getPaymentMetadata($course, $user, $courseUser)
        );

        // Update enrollment with payment details
        $courseUser->updatePaymentDetails($paymentIntent);

        return [
            'clientSecret' => $paymentIntent->client_secret,
            'status' => 'success',
            'course' => $course,
            // TODO: Create a resource for the course user
            'courseUser' => $courseUser
        ];
    }

    /**
     * Calculate the payment amount in cents
     *
     * @param float $price
     * @return int
     */
    private function calculateAmount($price): int
    {
        return (int)($price * 100);
    }

    /**
     * Get payment metadata for the payment intent
     *
     * @param Course $course
     * @param User $user
     * @param CourseUser $courseUser
     * @return array
     */
    private function getPaymentMetadata(Course $course, User $user, CourseUser $courseUser): array
    {
        return [
            'metadata' => [
                'course_id' => $course->id,
                'user_id' => $user->id,
                'course_user_id' => $courseUser->id,
            ],
        ];
    }
}

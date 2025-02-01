<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Models\Course;
use App\Models\CourseUser;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class PaymentIntentController extends Controller
{
    public function createClientSecret(): Response
    {
        $courseId = request('course');
        $course = Course::where('id', $courseId)->first();

        Gate::authorize('enroll', $course);
        $user = request()->user();
        $hasPurchase = CourseUser::query()
            ->where('user_id', $user->id)
            ->where('course_id', $courseId)
            ->exists();

        $isAuthor = $course->author->is($user);
        if ($hasPurchase || $isAuthor) {
            return Inertia::render('Payment/Index', [
                'clientSecret' => null,
                'hasPurchase' => true,
                'isAuthor' => $isAuthor,
            ]);
        }

        // Create payment intent for the course
        $paymentIntent = $user->pay($course->price * 100, [
            'metadata' => [
                'course_id' => $course->id,
                'user_id' => $user->id,
            ],
        ]);

        return Inertia::render('Payment/Index', [
            'course' => new CourseResource($course),
            'clientSecret' => $paymentIntent->client_secret ?? null,
            'hasPurchase' => false,
            'isAuthor' => $isAuthor,
        ]);
    }
}

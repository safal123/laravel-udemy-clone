<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Models\Course;
use App\Models\CourseUser;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class PaymentController extends Controller
{
    public function show(): Response
    {
        $courseId = request('course');
        $course = Course::where('id', $courseId)->first();

        Gate::authorize('enroll', $course);

        $user = request()->user();

        $hasPurchase = CourseUser::query()
            ->where('user_id', $user->id)
            ->where('course_id', $courseId)
            ->exists();

        $course = Course::with([
            'author',
            'chapters' => fn ($query) => $query->where('is_published', true)
                ->whereNotNull('video_storage_id'),
        ])->findOrFail($courseId);
        $isAuthor = $course->author->is($user);
        if ($hasPurchase) {
            return Inertia::render('Payment/Index', [
                'course' => new CourseResource($course),
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

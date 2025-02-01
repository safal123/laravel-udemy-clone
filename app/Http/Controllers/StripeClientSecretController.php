<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class StripeClientSecretController extends Controller
{
    public function createClientSecret(Request $request): JsonResponse
    {
        $courseId = $request->course;
        $course = Course::findOrFail($courseId);
        Gate::authorize('enroll', $course);
        $paymentIntent = $request->user()->pay($course->price * 100, [
            'metadata' => [
                'course_id' => $course->id,
                'user_id' => $request->user()->id,
            ],
        ]);

        return response()->json([
            'clientSecret' => $paymentIntent->client_secret ?? null,
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PaymentController extends Controller
{
    public function show(): Response
    {
        $course = request('course');
        $options = [];
        if ($course) {
            $course = Course::query()
                ->where('id', $course)
                ->firstOrFail()
                ->load('chapters');
            $paymentIntent = request()->user()->pay(
                $course->price * 100
            );
            $options = [
                'course' => new CourseResource($course),
                'clientSecret' => $paymentIntent->client_secret ?? null,
            ];
        }
        return Inertia::render('Payment/Index', $options);
    }
}

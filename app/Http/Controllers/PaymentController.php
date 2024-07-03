<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function show()
    {
        $course = Course::findOrfail(request('course'));
        $paymentIntent = request()->user()->pay(
            $course->price,
        );
        return Inertia::render('Payment/Index', [
            'course' => $course,
            'clientSecret' => $paymentIntent->client_secret,
        ]);
    }
}

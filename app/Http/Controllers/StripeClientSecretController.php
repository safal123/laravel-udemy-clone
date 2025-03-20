<?php

namespace App\Http\Controllers;

use App\Actions\Stripe\StripeClientSecret;
use App\Models\Course;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class StripeClientSecretController extends Controller
{
    /**
     * Constructor
     */
    public function __construct(protected StripeClientSecret $stripeClientSecret) {}

    /**
     * Create a payment intent and return the client secret
     *
     * @return JsonResponse
     */
    public function createClientSecret(Request $request)
    {
        // Validate the request
        $validated = $request->validate([
            'course' => 'required|exists:courses,id',
        ]);

        // Authorize the user to enroll in the course
        Gate::authorize('enroll', $course = Course::findOrFail($validated['course']));

        try {
            // Create the payment intent
            $result = $this->stripeClientSecret->createPaymentIntent(
                $request->user(),
                $course
            );

            return response()->json($result);
        } catch (\Exception $e) {
            report($e);

            return response()->json([
                'error' => 'Unable to initialize payment.',
                'message' => config('app.debug') ? $e->getMessage() : 'An error occurred',
            ], 500);
        }
    }
}

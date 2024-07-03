<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StripeController extends Controller
{
    public function createPaymentIntent(Request $request): JsonResponse
    {
        $payment = $request->user()->pay(
            $request->amount,
        );

        return response()->json(['client_secret' => $payment->client_secret]);
    }
}

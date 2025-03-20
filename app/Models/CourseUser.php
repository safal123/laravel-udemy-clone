<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class CourseUser extends Pivot
{
    use HasFactory, HasUuids;

    public $table = 'course_user';

    protected $fillable = [
        'user_id',
        'course_id',
        'payment_intent_id',
        'payment_method',
        'purchase_status',
    ];

    /**
     * Update the enrollment record with payment details
     *
     * @param  object  $paymentIntent
     * @return bool
     */
    public function updatePaymentDetails($paymentIntent, $status = 'pending')
    {
        return $this->update([
            'payment_intent_id' => $paymentIntent->id,
            'payment_method' => $paymentIntent->payment_method ?? null,
            'purchase_status' => $status,
        ]);
    }
}

<?php

namespace App\Jobs\Stripe;

use App\Models\CourseUser;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Spatie\WebhookClient\Models\WebhookCall;
use Stripe\Event;

class HandlePaymentIntentSucceeded implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(public WebhookCall $webhookCall)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $event = Event::constructFrom($this->webhookCall->payload);

        // get the metadata from the event
        $metadata = $event->data->object->metadata;

        // check if the metadata is empty
        if (empty($metadata)) {
            // Log the error
            logger()->error('Metadata is empty', ['event' => $event]);
            return;
        }

        // check if the user is already enrolled in the course
        if (CourseUser::where('user_id', $metadata['user_id'])
            ->where('course_id', $metadata['course_id'])->exists()) {
            // Log the error
            logger()->error('User is already enrolled in the course', ['metadata' => $metadata]);
            return;
        }

        CourseUser::create([
            'user_id' => $metadata['user_id'],
            'course_id' => $metadata['course_id'],
        ]);
    }
}

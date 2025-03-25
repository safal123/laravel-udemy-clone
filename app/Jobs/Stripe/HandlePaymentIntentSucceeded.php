<?php

namespace App\Jobs\Stripe;

use App\Jobs\CreateCourseProgressRecordsJob;
use App\Mail\CoursePurchaseSuccess;
use App\Models\Course;
use App\Models\CourseUser;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
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

        Log::info('Metadata', ['metadata' => $metadata['user_id']]);

        CourseUser::updateOrCreate([
            'user_id' => $metadata['user_id'],
            'course_id' => $metadata['course_id'],
        ], [
            'purchase_status' => 'succeeded',
            'payment_completed_at' => now(),
        ]);

        Log::info('Creating course progress records', ['metadata' => $metadata]);
        $user = User::find($metadata['user_id']);
        $course = Course::find($metadata['course_id']);
        // Dispatch a job to create course progress records
        CreateCourseProgressRecordsJob::dispatch($metadata['course_id'], $metadata['user_id']);

        // Send email to user
        Mail::to($user->email)
        ->send(
            new CoursePurchaseSuccess($user, $course)
        );
    }
}

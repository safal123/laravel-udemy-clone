<?php

namespace App\Listeners;

use App\Events\ChapterVideoUploaded;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Http;

class TranscodeChapterVideo implements ShouldQueue
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(ChapterVideoUploaded $event): void
    {
        Http::get(config('services.video_processor.url').'/objects', [
            'objectId' => $event->chapter->video_storage_id,
        ]);
    }
}

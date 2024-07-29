<?php

namespace App\Models\Traits;

use Illuminate\Contracts\Filesystem\Filesystem;
use Illuminate\Support\Facades\Storage;

trait HasS3Upload
{
    private Filesystem $s3;

    public function initializeHasS3Upload(): void
    {
        $this->s3 = Storage::disk('s3');
    }


    public function getObjectUrl($path, $addMinutes = 3600): string
    {
        $this->initializeHasS3Upload();
        return $this
            ->s3
            ->temporaryUrl($path . $this->id, now()->addMinutes($addMinutes)) ?? '';
    }

    public function uploadToS3(string $path, $file, $fileName): void
    {
        $this->initializeHasS3Upload();
        $this->s3->putFileAs($path, $file, $fileName);
    }
}

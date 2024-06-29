<?php

namespace App\Models\Traits;

use Illuminate\Support\Facades\Storage;

trait HasS3Upload
{
    public function uploadDefaultImage(string $path, $fileName, $modelName)
    {
        $defaultImage = public_path("images/default-$modelName-image.jpg");
        $newFileName = $fileName;
        $this->uploadToS3($path, $defaultImage, $newFileName);
    }

    private function uploadToS3(string $path, $file, $fileName): string
    {
        $s3 = Storage::disk('s3');
        $s3->putFileAs($path, $file, $fileName);
        return $fileName;
    }
}

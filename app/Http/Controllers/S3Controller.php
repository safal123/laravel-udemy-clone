<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class S3Controller extends Controller
{
    public function createSignedUrl(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'fileName' => 'required|string',
            'path' => 'required|string',
        ]);
        $s3 = Storage::disk('s3')->getClient();
        $url = $s3->getCommand('PutObject', [
            'Bucket' => \Config::get('filesystems.disks.s3.bucket'),
            'Key' => $validated['path'].'/'.$validated['fileName'],
        ]);

        $request = $s3->createPresignedRequest($url, '+20 minutes');

        return response()->json([
            'url' => (string) $request->getUri(),
        ]);
    }

    public function getObjectUrl(Request $request)
    {
        $validated = $request->validate([
            'fileName' => 'required|string',
            'path' => 'required|string',
        ]);
        $s3 = Storage::disk('s3');

        $url = $s3->temporaryUrl($validated['path'].'/'.$validated['fileName'], now()->addMinutes(360));

        return response()->json([
            'url' => $url,
        ]);
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class CourseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $s3 = Storage::disk('s3');

        $image_url = $s3->temporaryUrl('courses/images/' . $this->image_storage_id, now()->addMinutes(360));
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'category_id' => $this->category_id,
            'description' => $this->description,
            'image_storage_id' => $this->image_storage_id,
            'is_published' => $this->is_published,
            'price' => $this->price,
            'image_url' => $image_url,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}

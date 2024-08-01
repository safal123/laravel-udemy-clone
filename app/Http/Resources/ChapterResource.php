<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ChapterResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'course_id' => $this->course_id,
            'description' => $this->description,
            'video_storage_id' => $this->video_storage_id,
            'is_published' => $this->is_published,
            'duration' => $this->duration,
            // TODO: Change this to use the storage disk
            'video_url' => '',
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'course' => $this->whenLoaded('course'),
            'is_free' => $this->is_free,
        ];
    }
}

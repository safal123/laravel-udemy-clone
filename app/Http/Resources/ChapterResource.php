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
            'title' => $this->title, // Always included
            'slug' => $this->whenHas('slug'),
            'course_id' => $this->whenHas('course_id'),
            'description' => $this->whenHas('description'),
            'video_storage_id' => $this->whenHas('video_storage_id'),
            'is_published' => $this->whenHas('is_published'),
            'duration' => $this->whenHas('duration'),
            'video_url' => $this->video_url,
            'created_at' => $this->whenHas('created_at'),
            'updated_at' => $this->whenHas('updated_at'),
            'course' => $this->whenLoaded('course'),
            'is_free' => $this->whenHas('is_free'),
            'order' => $this->whenHas('order'),
        ];
    }
}

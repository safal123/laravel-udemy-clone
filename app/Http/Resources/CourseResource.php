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
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'category_id' => $this->category_id,
            'description' => $this->description,
            'image_storage_id' => $this->image_storage_id,
            'is_published' => $this->is_published,
            'price' => $this->price,
            'image_url' => $this->image_url ?? '',
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'author' => $this->whenLoaded('author'),
            'chapters' => ChapterResource::collection($this->whenLoaded('chapters')),
            'chapters_count' => $this->chapters_count,
            'duration' => $this->duration ?? 10,
            $this->mergeWhen($this->relationLoaded('users'), [
                'users' => UserResource::collection($this->users),
            ]),
        ];
    }
}

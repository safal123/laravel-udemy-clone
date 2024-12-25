<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;
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
            'updated_at' => Carbon::parse($this->updated_at)->diffForHumans(),
            'author' => $this->whenLoaded('author'),
            'chapters' => ChapterResource::collection($this->whenLoaded('chapters')),
            'chapters_count' => $this->chapters_count,
            'duration' => $this->duration ?? 10,
            'level' => $this->level,
            $this->mergeWhen($this->relationLoaded('students'), [
                'users' => UserResource::collection($this->students),
            ]),
        ];
    }
}

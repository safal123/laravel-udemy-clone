<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

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
            'user_id' => $this->user_id,
            'created_at' => $this->created_at,
            'updated_at' => Carbon::parse($this->updated_at)->diffForHumans(),
            'author' => new UserResource($this->whenLoaded('author')),
            'chapters' => ChapterResource::collection($this->whenLoaded('chapters')),
            'chapters_count' => $this->chapters_count,
            'students_count' => $this->students_count,
            'duration' => $this->duration ?? 10,
            'level' => $this->level,
            'reviews' => CourseReviewResource::collection($this->whenLoaded('reviews')),
            'rating' => $this->averageRating(),
            'students' => UserResource::collection($this->whenLoaded('students')),
            'is_enrolled' => $this->is_enrolled ?? false,
            'is_wishlisted' => $this->is_wishlisted ?? false,
            'is_author' => $this->is_author ?? false,
            'has_reviewed' => $this->has_reviewed,
            'user_progress' => $this->userProgress,
        ];
    }
}

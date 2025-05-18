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
            'requirements' => $this->requirements,
            'target_audience' => $this->target_audience,
            'what_you_will_learn' => $this->what_you_will_learn,
            'image_storage_id' => $this->image_storage_id,
            'preview_video_id' => $this->preview_video_id,
            'is_published' => $this->is_published,
            'is_featured' => $this->is_featured ?? false,
            'price' => $this->price,
            'discount_price' => $this->discount_price,
            'image_url' => $this->image_url ?? '',
            'user_id' => $this->user_id,
            'level' => $this->level,
            'language' => $this->language ?? 'English',
            'duration_minutes' => $this->duration_minutes,
            'tags' => $this->tags,
            'average_rating' => $this->average_rating ?? $this->reviews_avg_rating ?? 0,
            'created_at' => $this->created_at,
            'updated_at' => Carbon::parse($this->updated_at)->diffForHumans(),
            'author' => new UserResource($this->whenLoaded('author')),
            'chapters' => ChapterResource::collection($this->whenLoaded('chapters')),
            'chapters_count' => (int) $this->chapters_count,
            'students_count' => (int) $this->students_count,
            'reviews_count' => $this->reviews_count,
            'duration' => $this->duration ?? 10,
            'reviews' => CourseReviewResource::collection($this->whenLoaded('reviews')),
            'rating' => (int) $this->reviews_avg_rating,
            'students' => UserResource::collection($this->whenLoaded('students')),
            'is_enrolled' => $this->is_enrolled ?? false,
            'is_wishlisted' => $this->is_wishlisted ?? false,
            'is_author' => $this->is_author ?? false,
            'has_reviewed' => $this->has_reviewed,
            'user_progress' => $this->whenLoaded('userProgress'),
            'media' => $this->whenLoaded('media'),
        ];
    }
}

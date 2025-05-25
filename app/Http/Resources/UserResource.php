<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'name' => $this->name,
            'email' => $this->whenHas('email'),
            'created_at' => $this->whenHas('created_at'),
            'updated_at' => $this->whenHas('updated_at'),
            'purchased_courses' => $this->whenHas('purchasedCourses'),
            'email_verified_at' => $this->whenHas('email_verified_at'),
            'wishlists' => WishlistResource::collection($this->whenLoaded('wishlists')),
            'roles' => $this->whenLoaded('roles'),
            // TODO: Figure out the appropriate way to check if the user is a teacher
            'is_teacher' => $this->getRoleNames()->intersect(['super-admin', 'teacher'])->isNotEmpty(),
            'purchase_details' => $this->purchaseDetails,
        ];
    }
}

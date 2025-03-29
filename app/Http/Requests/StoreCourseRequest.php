<?php

namespace App\Http\Requests;

use App\Models\Constants\CourseConstants;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCourseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|min:3|max:255',
            'description' => 'required|string|min:10',
            'price' => 'required|numeric|min:0|max:999',
            'discount_price' => 'nullable|numeric|min:0|max:999|lt:price',
            'category_id' => 'required|exists:categories,id',
            'slug' => ['required', 'string', 'regex:/^[a-z0-9-]+$/', Rule::unique('courses', 'slug')],
            'is_published' => 'boolean',
            'is_featured' => 'boolean',
            'level' => [
                'string',
                Rule::in([
                    CourseConstants::LEVEL_BEGINNER,
                    CourseConstants::LEVEL_INTERMEDIATE,
                    CourseConstants::LEVEL_ADVANCED,
                    CourseConstants::LEVEL_ALL_LEVELS,
                ]),
                'default:' . CourseConstants::LEVEL_BEGINNER,
            ],
            'language' => 'string|max:50',
            'duration_minutes' => 'nullable|integer|min:1',
            'requirements' => 'nullable|string',
            'target_audience' => 'nullable|string',
            'what_you_will_learn' => 'nullable|string',
            'tags' => 'nullable|string|max:255',
            'preview_video_id' => 'nullable|string',
            'image_storage_id' => 'nullable|string',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Course title is required',
            'title.min' => 'Course title must be at least 3 characters',
            'title.max' => 'Course title cannot exceed 255 characters',
            'description.required' => 'Course description is required',
            'description.min' => 'Course description must be at least 10 characters',
            'price.required' => 'Course price is required',
            'price.numeric' => 'Course price must be a valid number',
            'price.min' => 'Course price cannot be negative',
            'price.max' => 'Course price cannot be more than 999',
            'discount_price.numeric' => 'Discount price must be a valid number',
            'discount_price.min' => 'Discount price cannot be negative',
            'discount_price.max' => 'Discount price cannot be more than 999',
            'discount_price.lt' => 'Discount price must be less than the regular price',
            'slug.required' => 'Slug is required',
            'slug.regex' => 'Slug can only contain lowercase letters, numbers, and hyphens',
            'slug.unique' => 'Slug is already taken',
            'category_id.required' => 'Category is required',
            'category_id.exists' => 'Selected category does not exist',
            'is_published.boolean' => 'Publish status must be true or false',
            'is_featured.boolean' => 'Featured status must be true or false',
            'level.in' => 'Selected level is not valid',
            'language.string' => 'Language must be a string',
            'language.max' => 'Language name cannot exceed 50 characters',
            'duration_minutes.integer' => 'Duration must be a whole number',
            'duration_minutes.min' => 'Duration must be at least 1 minute',
            'tags.max' => 'Tags cannot exceed 255 characters',
        ];
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCourseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Allow all users to make this request
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'required', 'string', 'min:3', 'max:255'],
            'description' => ['sometimes', 'required', 'string', 'min:10'],
            // price can be integer or decimal
            'price' => ['sometimes', 'required', 'numeric', 'min:0', 'max:999'],
            'slug' => [
                'sometimes',
                'required',
                'string',
                'regex:/^[a-z0-9-]+$/',
                Rule::unique('courses')->ignore($this->route('course')->id),
            ],
            'category_id' => ['sometimes', 'required', 'exists:categories,id'],
            'is_published' => ['sometimes', 'required', 'boolean'],
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
            'price.decimal' => 'Course price must be a valid decimal number',
            'price.min' => 'Course price cannot be negative',
            'price.max' => 'Course price cannot be more than 999',
            'slug.required' => 'Slug is required',
            'slug.regex' => 'Slug can only contain lowercase letters, numbers, and hyphens',
            'slug.unique' => 'Slug is already taken',
            'category_id.required' => 'Category is required',
            'category_id.exists' => 'Selected category does not exist',
            'is_published.required' => 'Publish status is required',
            'is_published.boolean' => 'Publish status must be true or false',
        ];
    }
}

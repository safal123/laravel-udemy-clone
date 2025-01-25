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
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'price' => ['required', 'numeric', 'min:0', 'max:999'],
            'slug' => [
                'required',
                'string',
                Rule::unique('courses')
                    ->ignore($this->route('course')->id),
            ],
            'category_id' => ['required', 'exists:categories,id'],
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
            'description.required' => 'Course description is required',
            'price.required' => 'Course price is required',
            'price.numeric' => 'Course price must be a number',
            'price.min' => 'Course price cannot be negative',
            'price.max' => 'Course price cannot be more than 999',
            'slug.unique' => 'Slug is already taken',
            'category_id.required' => 'Category is required',
        ];
    }
}

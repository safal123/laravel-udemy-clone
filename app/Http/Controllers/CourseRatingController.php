<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CourseRatingController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'course_id' => 'required|exists:courses,id',
            'rating' => 'required|integer|between:1,5',
        ]);

        $request->user()->rateCourse($request->course_id, $request->rating);

        return response()->json(['message' => 'Course rated successfully']);
    }
}

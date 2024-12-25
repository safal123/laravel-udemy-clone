<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Http\Resources\CourseCollection;
use App\Http\Resources\CourseResource;
use App\Models\Category;
use App\Models\Course;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Teacher/Courses/Index', [
            'courses' => new CourseCollection(
                auth()
                    ->user()
                    ->courses()
                    ->orderBy('created_at', 'desc')
                    ->paginate(7)
            ),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Teacher/Courses/Create/Index', [
            'categories' => Category::orderBy('name')->get(),
        ]);
    }

    public function store(StoreCourseRequest $request): RedirectResponse
    {
        $request
            ->user()
            ->courses()
            ->create($request->validated());

        return redirect()
            ->route('teachers.courses')
            ->with('success', 'Course created successfully');
    }

    public function edit(Course $course): Response
    {
        return Inertia::render('Teacher/Courses/Edit/Index', [
            'course' => new CourseResource($course->load('chapters')),
        ]);
    }

    public function update(UpdateCourseRequest $request, Course $course): RedirectResponse
    {
        $course->update($request->validated());

        return redirect()
            ->back()
            ->with('success', 'Course updated successfully');
    }

    public function togglePublish(Course $course)
    {
        $course->update([
            'is_published' => !$course->is_published,
        ]);
        return \response()->json([
            'message' => 'Course published status updated successfully',
        ]);
    }

    public function destroy(Course $course): RedirectResponse
    {
        $course->delete();

        return redirect()
            ->route('teachers.courses')
            ->with('success', 'Course deleted successfully');
    }
}

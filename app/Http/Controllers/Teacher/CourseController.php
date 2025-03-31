<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Http\Resources\CourseCollection;
use App\Http\Resources\CourseResource;
use App\Models\Category;
use App\Models\Course;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
{
    /**
     * @throws AuthorizationException
     */
    public function index(): Response
    {
        $this->authorize('viewTeacherCourses', Course::class);

        return Inertia::render('Teacher/Courses/Index', [
            'courses' => new CourseCollection(
                auth()
                    ->user()
                    ->courses()
                    ->latest()
                    ->paginate(8)
            ),
        ]);
    }

    /**
     * @throws AuthorizationException
     */
    public function create(): Response
    {
        $this->authorize('create', Course::class);

        return Inertia::render('Teacher/Courses/Create/Index', [
            'categories' => Category::orderBy('name')->get(),
        ]);
    }

    /**
     * @throws AuthorizationException
     */
    public function store(StoreCourseRequest $request): RedirectResponse
    {
        $this->authorize('create', Course::class);

        $request
            ->user()
            ->courses()
            ->create($request->validated());

        return redirect()
            ->route('teachers.courses.index')
            ->with('success', 'Course created successfully');
    }

    /**
     * @throws AuthorizationException
     */
    public function edit(Course $course): Response
    {
        $this->authorize('view', $course);

        return Inertia::render('Teacher/Courses/Edit/Index', [
            'course' => new CourseResource($course->load('chapters')),
        ]);
    }

    /**
     * @throws AuthorizationException
     */
    public function update(UpdateCourseRequest $request, Course $course): RedirectResponse
    {
        $this->authorize($request->has('is_published') ? 'publish' : 'update', $course);

        $course->update($request->validated());

        return back()->with('success', 'Course updated successfully');
    }

    /**
     * @throws AuthorizationException
     */
    public function destroy(Course $course): RedirectResponse
    {
        $this->authorize('delete', $course);

        $course->delete();

        return redirect()
            ->route('teachers.courses.index')
            ->with('success', 'Course deleted successfully');
    }
}

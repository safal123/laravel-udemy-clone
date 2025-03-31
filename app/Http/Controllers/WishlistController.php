<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    public function store(Request $request)
    {
        if ($request->user()->wishlists()->where('course_id', $request->course_id)->exists()) {
            return redirect()
                ->back()
                ->withErrors(['error' => 'Course already in wishlist.']);
        }

        $request
            ->user()
            ->wishlists()
            ->create($request->only('course_id'));

        return redirect()
            ->back();
    }

    public function destroy(Request $request, Course $course): RedirectResponse
    {
        $request->user()->wishlists()->where('course_id', $course->id)->delete();

        return redirect()
            ->back()
            ->with('success', 'Course removed from wishlist.');
    }
}

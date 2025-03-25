<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;
use App\Models\Course;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
  return $request->user();
});

// Course search endpoint for search suggestions
Route::get('/courses/search', function (Request $request) {
  try {
    $query = $request->input('query');

    if (!$query || strlen($query) < 2) {
      return response()->json(['courses' => []]);
    }

    $courses = Course::query()
      ->whereHasPublishedChapters()
      ->where(function ($q) use ($query) {
        $q->where('title', 'like', '%' . $query . '%')
          ->orWhere('description', 'like', '%' . $query . '%');
      })
      ->select(['id', 'title', 'slug', 'image_storage_id'])
      ->limit(5)
      ->get()
      ->map(function ($course) {
        return [
          'id' => $course->id,
          'title' => $course->title,
          'slug' => $course->slug,
          'image_url' => $course->image_url ?? null
        ];
      });

    return response()->json(['courses' => $courses]);
  } catch (\Exception $e) {
    // Log error and return empty results to avoid crashing the UI
    error_log('Course search error: ' . $e->getMessage());
    return response()->json(['courses' => [], 'error' => 'Search currently unavailable'], 500);
  }
});

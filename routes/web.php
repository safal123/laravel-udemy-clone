<?php

use App\Http\Controllers\ChapterController;
use App\Http\Controllers\HomePageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\S3Controller;
use App\Http\Controllers\Teacher\CourseController;
use App\Http\Controllers\Teacher\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomePageController::class, 'index'])
    ->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/{course}', [\App\Http\Controllers\CourseController::class, 'show'])
    ->name('courses.show');

Route::middleware('auth')->group(function () {
    Route::get('/teachers/dashboard', [DashboardController::class, 'index'])
        ->name('teachers.dashboard');
    /*
     * Teacher Courses Routes
     */
    Route::group(['prefix' => 'teachers/courses'], function () {
        Route::get('/', [CourseController::class, 'index'])
            ->name('teachers.courses');
        Route::delete('/{course}', [CourseController::class, 'destroy'])
            ->name('teachers.courses.destroy');
        Route::get('/create', [CourseController::class, 'create'])
            ->name('teachers.courses.create');
        Route::post('/', [CourseController::class, 'store'])
            ->name('teachers.courses.store');
        Route::get('/{course}/edit', [CourseController::class, 'edit'])
            ->name('teachers.courses.edit');
        Route::put('/{course}', [CourseController::class, 'update'])
            ->name('teachers.courses.update');
        Route::put('/{course}/toggle-publish', [CourseController::class, 'togglePublish'])
            ->name('teachers.courses.toggle-publish');
    });

    /*
     * Teacher Chapters Routes
     */
    Route::group(['prefix' => 'teachers/courses/{course}/chapters'], function () {
        Route::post('/', [ChapterController::class, 'store'])
            ->name('teachers.courses.chapters.store');
        Route::put('/{chapter}', [ChapterController::class, 'update'])
            ->name('teachers.courses.chapters.update');
        Route::delete('/{chapter}', [ChapterController::class, 'destroy'])
            ->name('teachers.courses.chapters.destroy');
        Route::post('/{chapter}/video', [ChapterController::class, 'addChapterVideo'])
            ->name('teachers.courses.chapters.video');
        Route::put('/{chapter}/toggle-publish', [ChapterController::class, 'togglePublish'])
            ->name('teachers.courses.chapters.toggle-publish');
    });

    /*
     * S3 Routes
     */
    Route::group(['prefix' => 's3'], function () {
        Route::post('/get-signed-url', [S3Controller::class, 'createSignedUrl'])
            ->name('s3.get-signed-url');
        Route::post('/get-object-url', [S3Controller::class, 'getObjectUrl'])
            ->name('s3.get-object-url');
    });

});

require __DIR__.'/auth.php';

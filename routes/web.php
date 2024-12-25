<?php

use App\Http\Controllers\ChapterController;
use App\Http\Controllers\HomePageController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\S3Controller;
use App\Http\Controllers\StripeController;
use App\Http\Controllers\StripeWebhookController;
use App\Http\Controllers\Teacher\CourseController;
use App\Http\Controllers\Teacher\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

require __DIR__.'/auth.php';
Route::get('/', [HomePageController::class, 'index'])
    ->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::stripeWebhooks('stripe/webhook');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/payment', [PaymentController::class, 'show'])
        ->name('payment.show');
});

Route::group(['prefix' => 'courses'], function () {
    Route::get('/{course:slug}', [\App\Http\Controllers\CourseController::class, 'show'])
        ->name('courses.show');
});

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
        Route::put('/{chapter}/toggle-is-free', [ChapterController::class, 'toggleFree'])
            ->name('teachers.courses.chapters.toggle-is-free');
    });

    /*
     * Student Course Chapters Routes
     */

    Route::get('/{course}/{chapter}', [ChapterController::class, 'show'])
        ->name('courses.chapters.show');

    /*
     * S3 Routes
     */
    Route::group(['prefix' => 's3'], function () {
        Route::post('/get-signed-url', [S3Controller::class, 'createSignedUrl'])
            ->name('s3.get-signed-url');
        Route::post('/get-object-url', [S3Controller::class, 'getObjectUrl'])
            ->name('s3.get-object-url');
    });

    /*
     * Stripe Routes
     */
    Route::group(['prefix' => 'stripe'], function () {
        Route::post('/create-payment-intent', [StripeController::class, 'createPaymentIntent'])
            ->name('stripe.create-payment-intent');
    });
});

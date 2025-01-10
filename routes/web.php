<?php

use App\Http\Controllers\
{
    HomePageController,
    PaymentController,
    ProfileController,
    S3Controller,
    StripeController,
    Teacher\ChapterController,
    Teacher\CourseController,
    Teacher\DashboardController
};
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

require __DIR__.'/auth.php';
Route::get('/', [HomePageController::class, 'index'])
    ->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::stripeWebhooks('stripe/webhook');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/payment', [PaymentController::class, 'show'])
        ->name('payment.show');

    Route::get('/teachers/dashboard', [DashboardController::class, 'index'])
        ->name('teachers.dashboard');
    /*
     * Teacher Courses Routes
     */
    Route::group(['prefix' => 'teachers'], function () {
        Route::resource('courses', CourseController::class)
            ->names('teachers.courses');
        Route::put('{course}/toggle-publish', [CourseController::class, 'togglePublish'])
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

    Route::group(['prefix' => 'courses'], function () {
        Route::get('/{course:slug}', [\App\Http\Controllers\CourseController::class, 'show'])
            ->name('courses.show');
        Route::get('/{course:slug}/chapters/{chapter}', [\App\Http\Controllers\ChapterController::class, 'show'])
            ->name('courses.chapters.show');
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

    /*
     * Stripe Routes
     */
    Route::group(['prefix' => 'stripe'], function () {
        Route::post('/create-payment-intent', [StripeController::class, 'createPaymentIntent'])
            ->name('stripe.create-payment-intent');
    });
});

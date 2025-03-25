<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\CourseReviewController;
use App\Http\Controllers\DashboardController as StudentDashboardController;
use App\Http\Controllers\HomePageController;
use App\Http\Controllers\PaymentIntentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\S3Controller;
use App\Http\Controllers\StripeClientSecretController;
use App\Http\Controllers\Teacher\ChapterController;
use App\Http\Controllers\Teacher\CourseController;
use App\Http\Controllers\Teacher\DashboardController;
use App\Http\Controllers\UserProgressController;
use App\Http\Controllers\WishlistController;
use App\Mail\CoursePurchaseSuccess;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;

require __DIR__ . '/auth.php';

Route::get('/test', function () {
    $user = \App\Models\User::first();
    $course = \App\Models\Course::with('author')->first();

    // Mail::to($user->email)->send(new CoursePurchaseSuccess($user, $course));

    return view('emails.review-thanks', [
        'user' => $user,
        'course' => $course,
    ]);
});

Route::get('/', [HomePageController::class, 'index'])
    ->name('home');
Route::stripeWebhooks('stripe/webhook');

//Route::get('/courses/search', function (Request $request) {
//    $query = $request->input('query');
//    $courses = Course::where('title', 'like', "%{$query}%")
//        ->get();
//
//    return response()->json(\App\Http\Resources\CourseResource::collection($courses));
//});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('activities', ActivityController::class)
        ->only(['store'])
        ->names('activities');
    Route::resource('user-progress', UserProgressController::class)
        ->only(['store', 'update'])
        ->names('progress');
    Route::get('/dashboard', [StudentDashboardController::class, 'index'])
        ->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/payment', [PaymentIntentController::class, 'show'])
        ->name('payment.show');
    Route::get('/p/client-secret', [StripeClientSecretController::class, 'createClientSecret'])
        ->name('payment.client-secret');

    Route::get('/teachers/dashboard', [DashboardController::class, 'index'])
        ->name('teachers.dashboard');

    Route::resource('wishlists', WishlistController::class)
        ->only(['index', 'store', 'destroy'])
        ->names('wishlists');

    /*
     * Teacher Courses Routes
     */
    Route::group(['prefix' => 'teachers'], function () {
        Route::resource('courses', CourseController::class)
            ->names('teachers.courses');
    });

    /*
     * Teacher Chapters Routes
     */
    Route::group(['prefix' => 'teachers/courses/{course}/chapters'], function () {
        Route::put('/order', [ChapterController::class, 'updateOrder'])
            ->name('teachers.courses.chapters.order');
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
     * Courses Routes
     */
    Route::group(['prefix' => 'courses'], function () {
        Route::get('/', [\App\Http\Controllers\CourseController::class, 'index'])
            ->name('courses.index');
        Route::get('/{course:slug}', [\App\Http\Controllers\CourseController::class, 'show'])
            ->name('courses.show');
        Route::get('/{course:slug}/chapters/{chapter}', [\App\Http\Controllers\ChapterController::class, 'show'])
            ->name('courses.chapters.show');

        // Course Review Routes
        Route::resource('{course}/reviews', CourseReviewController::class)
            ->only(['store', 'edit', 'update', 'show',  'destroy'])
            ->names([
                'index' => 'courses.reviews',
                'store' => 'courses.submitReview',
                'edit' => 'courses.editReview',
                'update' => 'courses.updateReview',
                'show' => 'courses.reviews.show',
                'destroy' => 'courses.reviews.destroy',
            ]);
        Route::post('reviews/{review}/helpful', [CourseReviewController::class, 'markHelpful'])
            ->name('reviews.markHelpful');
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

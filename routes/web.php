<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\CourseReviewController;
use App\Http\Controllers\DashboardController as StudentDashboardController;
use App\Http\Controllers\HomePageController;
use App\Http\Controllers\PaymentIntentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ResourceController;
use App\Http\Controllers\S3Controller;
use App\Http\Controllers\StripeClientSecretController;
use App\Http\Controllers\Teacher\ChapterController;
use App\Http\Controllers\Teacher\CourseController;
use App\Http\Controllers\Teacher\DashboardController;
use App\Http\Controllers\UserProgressController;
use App\Http\Controllers\WishlistController;
use App\Mail\CoursePurchaseSuccess;
use App\Models\Course;
use App\Services\DeepSeekService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

require __DIR__ . '/auth.php';

Route::get('/test', function () {
    // $deepSeekService = new DeepSeekService();
    // $response = $deepSeekService->generateText('Hello, how are you?');
    // dd($response);

    // Mail::to($user->email)->send(new CoursePurchaseSuccess($user, $course));

    // return view('emails.verify-email', [
    //     'user' => $user,
    //     'url' => 'https://laravel.picblur.com',
    //     'expiresIn' => 60,
    // ]);
    // return view('emails.course-purchase-success', [
    //     'course' => $course,
    //     'user' => $user,
    //     'url' => 'https://laravel.picblur.com',
    //     'expiresIn' => 60,
    // ]);
    // $coursMedia = Course::with('media')->first();
    // dd($coursMedia);
    // try {
    //     Mail::raw('This is a test email', function ($message) {
    //         $message
    //             ->to('pokharelsafal66@gmail.com')
    //             ->subject('Laravel SMTP Test');
    //     });
    //     return "Email sent successfully!";
    // } catch (\Exception $e) {
    //     return "SMTP error: " . $e->getMessage();
    // }
});

Route::get('/', HomePageController::class)
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
    // Route::get('/deepseek', function () {
    //     // only for super admin
    //     if (auth()->user()->email !== config('app.super_admin_email')) {
    //         return response()->json(['error' => 'Unauthorized'], 403);
    //     }
    //     $prompt = request()->only('prompt');

    //     if (!$prompt) {
    //         return response()->json(['error' => 'Prompt is required'], 400);
    //     }

    //     $deepSeekService = new DeepSeekService();
    //     $response = $deepSeekService->generateText($prompt);

    //     dd($response);
    //     return response()->json($response);
    // })->name('deepseek.generate');
    Route::get('/payment-success', function () {
        $course = Course::first();
        return Inertia::render('Payment/Success/Index', [
            'course' => $course,
            'paymentDetails' => [
                'amount' => 100,
                'paymentId' => '1234567890',
                'paymentMethod' => 'Credit Card',
                'paymentDate' => now(),
            ],
        ]);
    })->name('payment.success');
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
        ->names('wishlists')
        ->parameters([
            'wishlists' => 'course',
        ]);

    /*
     * Teacher Courses Routes
     */
    Route::group(['prefix' => 'teachers'], function () {
        Route::resource('courses', CourseController::class)
            ->names('teachers.courses');
        Route::resource('/resources', ResourceController::class)
            ->names('teachers.resources');
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

// Footer Pages
Route::get('/about', function () {
    return Inertia::render('About/Index');
})->name('about');

Route::get('/contact', function () {
    return Inertia::render('Contact/Index');
})->name('contact');

Route::get('/terms', function () {
    return Inertia::render('Legal/Terms');
})->name('terms');

Route::get('/privacy', function () {
    return Inertia::render('Legal/Privacy');
})->name('privacy');

Route::get('/cookie-policy', function () {
    return Inertia::render('Legal/Cookie');
})->name('cookie-policy');

Route::get('/help', function () {
    return Inertia::render('Help/Index');
})->name('help');

Route::get('/careers', function () {
    return Inertia::render('Careers/Index');
})->name('careers');

Route::get('/blog', function () {
    return Inertia::render('Blog/Index');
})->name('blog');

Route::get('/teach', function () {
    return Inertia::render('Teach/Index');
})->name('teach');

Route::get('/instructor-guidelines', function () {
    return Inertia::render('Teach/Guidelines');
})->name('instructor-guidelines');

Route::get('/partner', function () {
    return Inertia::render('Partner/Index');
})->name('partner');

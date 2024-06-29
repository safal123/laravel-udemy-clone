<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Foundation\Application;

class HomePageController extends Controller
{
    public function index()
    {
        $courses = Course::query()
            ->where('is_published', true)
            ->orderBy('created_at', 'desc')
            ->with('user')
            ->paginate(10);
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'courses' => $courses,
        ]);
    }
}

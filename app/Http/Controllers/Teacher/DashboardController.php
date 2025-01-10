<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $students = auth()
            ->user()
            ->students()
            ->count();
        dd($students);
        return Inertia::render('Teacher/Dashboard/Index');
    }
}

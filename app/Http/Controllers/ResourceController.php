<?php

namespace App\Http\Controllers;

use App\Models\Media;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResourceController extends Controller
{
    public function index()
    {
        $resources = Media::query()
            ->where('created_by', auth()->user()->id)
            ->get();
        return Inertia::render('Teacher/Resources/Index', [
            'resources' => $resources,
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ActivityController extends Controller
{
    public function store(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'activity_type' => 'required|string',
            'meta_data' => 'nullable|json',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

//        dd(auth()->user()->id);

        // Save the activity
        Activity::create([
            'user_id' => auth()->user()->id,
            'type' => $request->activity_type,
            'meta_data' => $request->metadata,
        ]);
        // remove video_
        $type = str_replace('video_', '', $request->activity_type);
        return response()->json(['message' => "Video is {$type}"]);
    }
}

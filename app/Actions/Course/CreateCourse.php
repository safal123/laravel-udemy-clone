<?php

namespace App\Actions\Course;

use App\Models\Course;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class CreateCourse
{
    /**
     * Create a new course.
     *
     * @return void
     */
    public function handle(User $user, array $data)
    {
        DB::transaction(function () use ($user, $data) {
            $course = Course::create([
                'user_id' => $user->id,
                'title' => $data['title'],
                'description' => $data['description'],
            ]);

            return $course;
        });
    }
}

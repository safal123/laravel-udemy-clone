<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class CourseUser extends Pivot
{
    use HasFactory, HasUuids;

    public $table = 'course_user';

    protected $fillable = [
        'user_id',
        'course_id',
    ];
}

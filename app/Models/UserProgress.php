<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class UserProgress extends Model
{
    use HasUuids;

    protected $table = 'user_progress';

    protected $fillable = [
        'user_id',
        'course_id',
        'chapter_id',
        'completed_at',
        'is_completed',
        'time_spent',
        'last_accessed_at',
    ];

    protected $casts = [
        'completed_at' => 'datetime',
        'is_completed' => 'boolean',
        'time_spent' => 'integer',
        'last_accessed_at' => 'datetime',
    ];

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    public function course(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Course::class, 'course_id', 'course_id');
    }

    public function chapter(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Chapter::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'file_name',
        'path',
        'mime_type',
        'disk',
        'size',
        'duration',
        'type',
        'url',
        'thumbnail_url',
        'caption',
        'metadata',
        'status',
        'created_by',
        'is_processed',
    ];

    protected $casts = [
        'metadata' => 'array',
        'status' => 'string',
        'is_processed' => 'boolean',
    ];

    public function model()
    {
        return $this->morphTo();
    }
}

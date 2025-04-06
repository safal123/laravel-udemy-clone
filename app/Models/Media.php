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
        'type',
        'url',
        'thumbnail_url',
        'caption',
        'metadata'
    ];

    protected $casts = [
        'metadata' => 'array'
    ];

    public function model()
    {
        return $this->morphTo();
    }
}

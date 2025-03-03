<?php

namespace App\Models\Builders;

use Illuminate\Database\Eloquent\Builder;

class ChapterBuilder extends Builder
{
    public function next()
    {
        // uuid is not auto incrementing, so we can't use id
        return $this
            ->orderBy('id', 'asc')
            ->where('id', '>', $this->id)
            ->first();
    }

    public function previous()
    {
        return $this
            ->orderBy('id', 'desc')
            ->where('id', '<', $this->id)
            ->first();
    }
}

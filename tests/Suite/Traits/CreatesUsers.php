<?php

namespace Tests\Suite\Traits;

use App\Models\User;

use function Tests\Suite\create;

trait CreatesUsers
{
    public function createUser($data = [])
    {
        return create(User::class, $data);
    }
}

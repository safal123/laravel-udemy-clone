<?php

namespace Tests\Suite;

/**
 * create a new record in the database.
 *
 * @param  null  $scope
 */
function create($class, array $attributes = [], $scope = null): mixed
{
    $factory = $class::factory();

    if (! empty($scope)) {
        return $factory
            ->$scope()
            ->create($attributes);
    }

    return $factory->create($attributes);
}

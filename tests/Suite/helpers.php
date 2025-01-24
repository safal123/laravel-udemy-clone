<?php

namespace Tests\Suite;


/**
 * create a new record in the database.
 *
 * @param $class
 * @param  array  $attributes
 * @param  null  $scope
 *
 * @return mixed
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

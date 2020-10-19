<?php
namespace App\Repositories;

use App\Models\User;

/**
 * Class UserRepository
 *
 * @package App\Repositories
 */
class UserRepository extends RepositoryAbstract
{
    /**
     * Function getModel
     *
     * @return mixed
     */
    public function getModel()
    {
        return User::class;
    }
}

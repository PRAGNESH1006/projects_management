<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Collection;

class UserRepository extends BaseRepository
{
    public function __construct(User $model)
    {
        parent::__construct($model);
    }

    public function getAllUserByRole(string $role): Collection
    {
        return $this->newQuery()
            ->where('role', $role)
            ->get();
    }

    public function countByRole(string $role): int
    {
        return $this->newQuery()
            ->where('role', $role)
            ->count();
    }

    public function getRecentUsersByRole(string $role, int $limit): Collection
    {
        return $this->newQuery()
            ->where('role', $role)
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();
    }

    public function getUsersWithNameId(string $role): Collection
    {
        return $this->newQuery()
            ->where('role', $role)
            ->select('id', 'name', 'role')
            ->get();
    }

    public function getRecentTasks(){
        return $this->newQuery()
            ->where('role', 'employee')
            ->with('tasks')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();
    }
}

<?php

namespace App\Repositories;

use App\Models\Task;
use Illuminate\Support\Collection;
use Throwable;

class TaskRepository extends BaseRepository
{
    public function __construct(Task $model)
    {
        parent::__construct($model);
    }

    public function getTasksByEmployee($id): Collection
    {
        return $this->newQuery()
            ->where('assigned_to', $id)
            ->get();
    }

    public function getProjectsByEmployee($employeeId): Collection
    { 
        $tasks = $this->newQuery()
            ->where('assigned_to', $employeeId)
            ->with('project')
            ->get();
        return $tasks->pluck('project')->unique();
    }

    public function count(): int
    {
        return $this->newQuery()->count();
    }

    public function getRecentTasks(int $limit): Collection
    {
        return $this->newQuery()
            ->with(['project', 'assignedUser'])
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();
    }
}

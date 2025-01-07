<?php

namespace App\Repositories;

use App\Models\Project;
use Illuminate\Support\Collection;

class ProjectRepository extends BaseRepository
{
    public function __construct(Project $model)
    {
        parent::__construct($model);
    }

    public function getProjectsByClient(string $id): Collection
    {
        return $this->newQuery()
            ->where('client_id', $id)
            ->get();
    }

    public function getTasksByClient(string $clientId): Collection
    {
        return $this->newQuery()
            ->from('tasks')
            ->join('projects', 'tasks.project_id', '=', 'projects.id')
            ->where('projects.client_id', $clientId)
            ->get(['tasks.*']);
    }


    public function count(): int
    {
        return $this->newQuery()->count();
    }

    public function getRecentProjects(int $limit): Collection
    {
        return $this->newQuery()
            ->with(['client', 'tasks'])
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();
    }

    public function getProjectsByEmployee($employeeId): Collection
    {
        return $this->newQuery()
            ->whereHas('tasks', function ($query) use ($employeeId) {
                $query->where('assigned_to', $employeeId);
            })
            ->get();
    }

    public function getProjectEmployees($id)
    {
        return $this->newQuery()
            ->where('id', $id)
            ->with('users')
            ->first()
            ->users
            ->select('id', 'name');
    }

    public function getProjectsByEmployeeWithPagination(string $employeeId)
    {
        return $this->newQuery()
            ->whereHas('users', function ($query) use ($employeeId) {
                $query->where('user_id', $employeeId);
            })
            ->with('client', 'creator')
            ->paginate(8);
    }

    public function getSearch($searchTerm)
    {
        return $this->newQuery()
            ->with(['tasks', 'users', 'client', 'creator'])
            ->where(function ($query) use ($searchTerm) {
                $query->where('title', 'like', "%{$searchTerm}%")
                    ->orWhereHas('tasks', function ($query) use ($searchTerm) {
                        $query->where('title', 'like', "%{$searchTerm}%");
                    })
                    ->orWhereHas('users', function ($query) use ($searchTerm) {
                        $query->where('name', 'like', "%{$searchTerm}%");
                    })
                    ->orWhereHas('creator', function ($query) use ($searchTerm) {
                        $query->where('name', 'like', "%{$searchTerm}%");
                    })
                    ->orWhereHas('client', function ($query) use ($searchTerm) {
                        $query->where('name', 'like', "%{$searchTerm}%");
                    });
            })
            ->paginate(8);;
    }
}

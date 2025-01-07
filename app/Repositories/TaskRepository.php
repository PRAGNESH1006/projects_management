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

    public function getProjectsByEmployee($employeeId)
    {
        $tasks = $this->newQuery()
            ->where('assigned_to', $employeeId)
            ->with('project')
            ->paginate(8);
        return $tasks;
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

    public function getAllTaskCompletionStats(): array
    {
        $totalTasks = $this->newQuery()
            ->count();
        $completedTasks = $this->newQuery()
            ->where('status', 'completed')
            ->count();
        $pendingTasks = $this->newQuery()
            ->where('status', 'pending')
            ->count();
        $inProgressTasks = $this->newQuery()->where('status', 'in_progress')
            ->count();
        $overdueTasks = $this->newQuery()
            ->where('end_date', '<', now())
            ->where('status', '!=', 'completed')
            ->count();

        return [
            'total' => $totalTasks,
            'completed' => $completedTasks,
            'pending' => $pendingTasks,
            'in_progress' => $inProgressTasks,
            'overdue' => $overdueTasks,
        ];
    }

    public function getTasksByEmployee($employeeId): Collection
    {
        return $this->newQuery()
            ->where('assigned_to', $employeeId)
            ->get();
    }

    public function getTaskCompletionStats($employeeId): array
    {
        $totalTasks = $this->newQuery()
            ->where('assigned_to', $employeeId)
            ->count();
        $completedTasks = $this->newQuery()
            ->where('assigned_to', $employeeId)
            ->where('status', 'completed')
            ->count();
        $pendingTasks = $this->newQuery()
            ->where('assigned_to', $employeeId)
            ->where('status', 'pending')
            ->count();
        $overdueTasks = $this->newQuery()
            ->where('assigned_to', $employeeId)
            ->where('end_date', '<', now())
            ->where('status', '!=', 'completed')
            ->count();

        return [
            'total' => $totalTasks,
            'completed' => $completedTasks,
            'pending' => $pendingTasks,
            'overdue' => $overdueTasks,
        ];
    }

    public function getRecentTasksByEmployee($employeeId, int $limit): Collection
    {
        return $this->newQuery()
            ->where('assigned_to', $employeeId)
            ->orderBy('updated_at', 'desc')
            ->limit($limit)
            ->get();
    }

    public function getRecentActivitiesByEmployee($employeeId, int $limit): Collection
    {
        return $this->newQuery()
            ->where('assigned_to', $employeeId)
            ->orWhere('created_by', $employeeId)
            ->orderBy('updated_at', 'desc')
            ->limit($limit)
            ->get(['id', 'title', 'status', 'updated_at']);
    }

    public function getTasksByCLient($id)
    {
        return $this->newQuery()
            ->whereHas('project', function ($query) use ($id) {
                $query->where('client_id', $id);
            })
            ->with('project', 'assignedUser', 'client')
            ->paginate(8);
    }
    public function getSearch($searchTerm)
    {
        return $this->newQuery()
            ->with(['project', 'assignedUser', 'creator', 'client'])
            ->where(function ($query) use ($searchTerm) {
                $query->where('title', 'like', "%{$searchTerm}%")
                    ->orWhereHas('project', function ($query) use ($searchTerm) {
                        $query->where('title', 'like', "%{$searchTerm}%");
                    })
                    ->orWhereHas('assignedUser', function ($query) use ($searchTerm) {
                        $query->where('name', 'like', "%{$searchTerm}%");
                    })
                    ->orWhereHas('creator', function ($query) use ($searchTerm) {
                        $query->where('name', 'like', "%{$searchTerm}%");
                    })
                    ->orWhereHas('client', function ($query) use ($searchTerm) {
                        $query->where('name', 'like', "%{$searchTerm}%");
                    });
            })
            ->paginate(8);
    }
}

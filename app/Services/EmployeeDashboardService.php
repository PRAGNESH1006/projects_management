<?php

namespace App\Services;

use App\Repositories\TaskRepository;
use App\Repositories\ProjectRepository;

class EmployeeDashboardService
{
    protected TaskRepository $taskRepository;
    protected ProjectRepository $projectRepository;

    public function __construct(TaskRepository $taskRepository, ProjectRepository $projectRepository)
    {
        $this->taskRepository = $taskRepository;
        $this->projectRepository = $projectRepository;
    }

    public function getDashboardData( $employeeId): array
    {
        $taskStats = $this->taskRepository->getTaskCompletionStats($employeeId);
        $recentTasks = $this->taskRepository->getRecentTasksByEmployee($employeeId, 5);
        $recentActivities = $this->taskRepository->getRecentActivitiesByEmployee($employeeId, 10);
        $projects = $this->projectRepository->getProjectsByEmployee($employeeId);

        return [
            'tasksCount' => $taskStats['total'],
            'completedTasks' => $taskStats['completed'],
            'pendingTasks' => $taskStats['pending'],
            'overdueTasks' => $taskStats['overdue'],
            'taskRatio' => $taskStats['total'] > 0 ? $taskStats['completed'] / $taskStats['total'] : 0,
            'recentTasks' => $recentTasks,
            'recentActivities' => $recentActivities,
            'projects' => $projects,
            'projectsCount' => count($projects),
        ];
    }
}

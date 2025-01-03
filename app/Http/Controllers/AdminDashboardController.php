<?php

namespace App\Http\Controllers;

use App\Repositories\ProjectRepository;
use App\Repositories\TaskRepository;
use App\Repositories\UserRepository;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    protected $projectRepository;
    protected $taskRepository;
    protected $userRepository;

    public function __construct(
        ProjectRepository $projectRepository,
        TaskRepository $taskRepository,
        UserRepository $userRepository
    ) {
        $this->projectRepository = $projectRepository;
        $this->taskRepository = $taskRepository;
        $this->userRepository = $userRepository;
    }

    public function show(): Response
    {
        $projectCount = $this->projectRepository->count();
        $taskCount = $this->taskRepository->count();
        $clientCount = $this->userRepository->countByRole('client');
        $employeeCount = $this->userRepository->countByRole('employee');

        $recentProjects = $this->projectRepository->getRecentProjects(5);
        $recentTasks = $this->taskRepository->getRecentTasks(10);
        $recentClients = $this->userRepository->getRecentUsersByRole('client', 5);
        $recentEmployees = $this->userRepository->getRecentUsersByRole('employee', 5);
        $allTaskCompletionStats = $this->taskRepository->getAllTaskCompletionStats();

        return Inertia::render('Admin/Dashboard', compact(
            'projectCount',
            'taskCount',
            'clientCount',
            'employeeCount',
            'recentProjects',
            'recentTasks',
            'recentClients',
            'recentEmployees',
            'allTaskCompletionStats'
        ));        
    }
}

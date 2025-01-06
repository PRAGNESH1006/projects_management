<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Repositories\UserRepository;
use App\Repositories\TaskRepository;
use App\Repositories\ProjectRepository;
use App\Services\EmployeeDashboardService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


class EmployeeController extends Controller
{
    protected UserRepository $userRepository;
    protected TaskRepository $taskRepository;
    protected ProjectRepository $projectRepository;
    protected EmployeeDashboardService $dashboardService;


    public function __construct(UserRepository $userRepository, TaskRepository $taskRepository, ProjectRepository $projectRepository, EmployeeDashboardService $dashboardService)
    {
        $this->userRepository = $userRepository;
        $this->taskRepository = $taskRepository;
        $this->projectRepository = $projectRepository;
        $this->dashboardService = $dashboardService;
    }


    public function show()
    {
        $data = $this->dashboardService->getDashboardData(Auth::id());

        return Inertia::render('Employee/Dashboard', [
            'tasksCount' => $data['tasksCount'],
            'completedTasks' => $data['completedTasks'],
            'pendingTasks' => $data['pendingTasks'],
            'overdueTasks' => $data['overdueTasks'],
            'taskRatio' => $data['taskRatio'],
            'recentTasks' => $data['recentTasks']->toArray(),
            'recentActivities' => $data['recentActivities']->toArray(),
            'projects' => $data['projects']->toArray(),
            'projectsCount' => $data['projectsCount'],
        ]);
    }

    public function index(): \Inertia\Response
    {
        $employees = $this->userRepository->getPaginate(8, relations: ['createdBy'], where: ['role' => 'employee']);
        return Inertia::render('Employee/Index', compact('employees'));
    }

    public function tasks(User $user): \Inertia\Response
    {
        $tasks = $this->taskRepository->getPaginate(8,relations:['project','assignedUser'], where:['assigned_to'=>$user->id]);
        return Inertia::render('Tasks/Index', compact('tasks'));
    }

    public function projects(User $user): \Inertia\Response
    {
        $projects =  $this->projectRepository->getProjectsByEmployeeWithPagination($user->id, 8);
        return Inertia::render('Projects/Index', compact('projects'));
    }
}

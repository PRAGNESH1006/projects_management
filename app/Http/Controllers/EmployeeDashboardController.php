<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Repositories\UserRepository;
use App\Repositories\TaskRepository;
use App\Repositories\ProjectRepository;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


class EmployeeDashboardController extends Controller
{
    protected UserRepository $userRepository;
    protected TaskRepository $taskRepository;
    protected ProjectRepository $projectRepository;

    public function __construct(UserRepository $userRepository, TaskRepository $taskRepository, ProjectRepository $projectRepository)
    {
        $this->userRepository = $userRepository;
        $this->taskRepository = $taskRepository;
        $this->projectRepository = $projectRepository;
    }

    public function show(): \Inertia\Response
    {
        $employeeId = Auth::user()->id;

        $tasks = $this->taskRepository->getTasksByEmployee($employeeId);
        $projects = $tasks->load('project')->pluck('project')->unique('id');
        $tasksCount = $tasks->count();
        $projectsCount = $this->taskRepository->getProjectsByEmployee($employeeId)->count();

        return Inertia::render('Employee/Dashboard', compact('tasks', 'tasksCount', 'projectsCount', 'projects'));
    }

    public function index(): \Inertia\Response
    {
        $employees = $this->userRepository->getAllUserByRole('employee');
        return Inertia::render('Employee/Index', compact('employees'));
    }

    public function tasks(User $user): \Inertia\Response
    {
        $tasks = $this->taskRepository->getTasksByEmployee($user->id);
        return Inertia::render('Employee/Tasks', compact('tasks'));
    }

    public function projects(User $user): \Inertia\Response
    {
        $projects = $this->taskRepository->getProjectsByEmployee($user->id);
        return Inertia::render('Employee/Projects', compact('projects'));
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Repositories\UserRepository;
use App\Repositories\ProjectRepository;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use function Laravel\Prompts\select;

class ClientController extends Controller
{
    protected UserRepository $userRepository;
    protected ProjectRepository $projectRepository;

    public function __construct(UserRepository $userRepository, ProjectRepository $projectRepository)
    {
        $this->userRepository = $userRepository;
        $this->projectRepository = $projectRepository;
    }

    public function show(): \Inertia\Response
    {
        $projects = $this->projectRepository->getProjectsByClient(Auth::user()->id);
        $tasks = $this->projectRepository->getTasksByClient(Auth::user()->id);
        return Inertia::render('Client/Dashboard', compact('projects', 'tasks'));
    }

    public function index(): \Inertia\Response
    {
        $clients = $this->userRepository->getPaginate(12, relations: ['clientDetail'], where: ['role' => 'client']);
        return Inertia::render('Client/Index', compact('clients'));
    }

    public function projects(User $user): \Inertia\Response
    {
        $projects = $this->projectRepository->getProjectsByClient($user->id);
        return Inertia::render('Projects/Index', compact('projects'));
    }

    public function tasks(User $user): \Inertia\Response
    {
        $tasks = $this->projectRepository->getTasksByClient($user->id);
        return Inertia::render('Client/Tasks', compact('tasks'));
    }
}

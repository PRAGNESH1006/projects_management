<?php

namespace App\Http\Controllers;

use App\Enums\TaskStatusEnum;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Jobs\SendDueDateReminderJob;
use App\Models\Task;
use App\Repositories\TaskRepository;
use App\Repositories\UserRepository;
use App\Repositories\ProjectRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Throwable;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends BaseController
{
    protected TaskRepository $taskRepository;
    protected UserRepository $userRepository;
    protected ProjectRepository $projectRepository;

    public function __construct(TaskRepository $taskRepository, UserRepository $userRepository, ProjectRepository $projectRepository)
    {
        $this->taskRepository = $taskRepository;
        $this->userRepository = $userRepository;
        $this->projectRepository = $projectRepository;
    }

    public function index(): Response
    {
        $tasks = $this->taskRepository->getPaginate(8, relations: ['project', 'assignedUser', 'client']);
        return Inertia::render('Tasks/Index', compact('tasks'));
    }

    public function show(Task $task): Response
    {
        $task = $task->load('assignedUser', 'creator', 'updater', 'project');
        return Inertia::render('Tasks/Show', compact('task'));
    }

    public function create(): Response
    {
        $statuses = TaskStatusEnum::options();
        $employees = $this->userRepository->getAllUserByRole('employee');
        $projects = $this->projectRepository->getAll();
        return Inertia::render('Tasks/Create', compact('employees', 'projects', 'statuses'));
    }

    public function store(StoreTaskRequest $request): RedirectResponse
    {
        DB::beginTransaction();
        try {
            $this->taskRepository->store($request->getInsertableFields());
            DB::commit();
            return $this->sendRedirectResponse(route('tasks.index'), 'Task Added Successfully');
        } catch (Throwable $e) {
            DB::rollBack();
            Log::error('Task store failed: ' . $e->getMessage());
            return $this->sendRedirectError(route('tasks.create'), 'Failed to add task::' . $e->getMessage());
        }
    }

    public function edit(Task $task): Response
    {
        $statuses = TaskStatusEnum::options();
        $task = $this->taskRepository->getById($task->id);
        $project = $task->project;
        $employees = $this->userRepository->getById($task->assigned_to);

        return Inertia::render('Tasks/Edit', compact('task', 'employees', 'statuses', 'project'));
    }

    public function update(Task $task, UpdateTaskRequest $request): RedirectResponse
    {
        $user = Auth::user();
        DB::beginTransaction();
        try {
            $this->taskRepository->update($task->id, $request->getUpdateableFields($task->project_id));
            DB::commit();
            if ($user->role->value === 'admin') {
                return $this->sendRedirectResponse(route('tasks.index', [$task->id]), 'Task Updated Successfully');
            } else {
                return $this->sendRedirectResponse(route($user->role->value . '.tasks', [$user->id]), 'Task Updated Successfully');
            }
        } catch (Throwable $e) {
            DB::rollBack();
            Log::error('Task update failed: ' . $e->getMessage());
            return $this->sendRedirectError(route('tasks.edit', $task->id), 'Failed to update task::' . $e->getMessage());
        }
    }

    public function destroy(Task $task): RedirectResponse
    {
        DB::beginTransaction();
        try {
            $this->taskRepository->destroy($task->id);
            DB::commit();
            return $this->sendRedirectResponse(route('tasks.index'), 'Task Deleted Successfully');
        } catch (Throwable $e) {
            DB::rollBack();
            Log::error('Task delete failed: ' . $e->getMessage());
            return $this->sendRedirectError(route('tasks.index'), 'Failed to delete task::' . $e->getMessage());
        }
    }
    public function search(): Response
    {
        $searchTerm = request('q');
        $tasks = $this->taskRepository->getSearch($searchTerm);
        return Inertia::render('Tasks/Index', compact('tasks'));
    }
}

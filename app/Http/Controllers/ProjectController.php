<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Repositories\ProjectRepository;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\RedirectResponse;
use Throwable;
use Inertia\Inertia;

class ProjectController extends BaseController
{
    protected ProjectRepository $projectRepository;
    protected UserRepository $userRepository;

    public function __construct(ProjectRepository $projectRepository, UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
        $this->projectRepository = $projectRepository;
    }

    public function index(): \Inertia\Response
    {
        $projects = $this->projectRepository->getAll();
        return Inertia::render('Projects/Index', compact('projects'));
    }

    public function show(Project $project): \Inertia\Response
    {
        $project->load('users', 'client', 'creator', 'updater', 'tasks');
        return Inertia::render('Projects/Show', compact('project'));
    }

    public function create(): \Inertia\Response
    {
        $clients = $this->userRepository->getUsersWithNameId('client');
        $employees = $this->userRepository->getUsersWithNameId('employee');
        return Inertia::render('Projects/Create', compact('clients', 'employees'));
    }

    public function edit(Project $project): \Inertia\Response
    {
        $clients = $this->userRepository->getUsersWithNameId('client');
        $employees = $this->userRepository->getUsersWithNameId('employee');
        return Inertia::render('Projects/Edit', compact('project', 'clients', 'employees'));
    }

    public function store(StoreProjectRequest $request): RedirectResponse
    {
        DB::beginTransaction();
        try {
            $project = $this->projectRepository->store($request->getInsertableFields());
            if ($request->has('employee_ids') && !empty($request->employee_ids)) {
                $project->users()->attach($request->employee_ids);
            }
            DB::commit();
            return $this->sendRedirectResponse(route('projects.index'), 'Project Added Successfully');
        } catch (Throwable $e) {
            DB::rollBack();
            return $this->sendRedirectBackError($e->getMessage());
        }
    }

    public function update(UpdateProjectRequest $request, Project $project): RedirectResponse
    {
        DB::beginTransaction();
        try {
            $project = $this->projectRepository->update($project->id, $request->getInsertableFields());

            if ($request->has('employee_ids') && !empty($request->employee_ids)) {
                $project->users()->sync($request->employee_ids);
            }
            DB::commit();
            return $this->sendRedirectResponse(route('projects.show', [$project->id]), 'Project Updated Successfully');
        } catch (Throwable $e) {
            DB::rollBack();
            return $this->sendRedirectBackError($e->getMessage());
        }
    }

    public function destroy(Project $project): RedirectResponse
    {
        DB::beginTransaction();
        try {
            $this->projectRepository->destroy($project->id);
            DB::commit();
            return $this->sendRedirectResponse(route('projects.index'), 'Project Deleted Successfully');
        } catch (Throwable $e) {
            DB::rollBack();
            return $this->sendRedirectError(route('projects.index'), $e->getMessage());
        }
    }
}

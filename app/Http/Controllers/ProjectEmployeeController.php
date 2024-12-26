<?php

namespace App\Http\Controllers;

use App\Repositories\ProjectEmployeeRepository;
use App\Models\ProjectEmployee;
use Inertia\Inertia;
use Inertia\Response;

class ProjectEmployeeController extends Controller
{
    protected ProjectEmployeeRepository $projectEmployeerepository;

    public function __construct(ProjectEmployeeRepository $projectEmployeerepository)
    {
        $this->projectEmployeerepository = $projectEmployeerepository;
    }

    public function index(): Response
    {
        $projects = $this->projectEmployeerepository->getAll();
        return Inertia::render('Projects/Index', ['projects' => $projects]);
    }

    public function show(ProjectEmployee $projectEmployee): Response
    {
        return Inertia::render('Projects/Show', ['projectEmployee' => $projectEmployee]);
    }

    public function create(): Response
    {
        return Inertia::render('Projects/Create');
    }

    public function edit(ProjectEmployee $projectEmployee): Response
    {
        return Inertia::render('Projects/Edit', ['projectEmployee' => $projectEmployee]);
    }
}

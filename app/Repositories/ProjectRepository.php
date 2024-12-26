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
}

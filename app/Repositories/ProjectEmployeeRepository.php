<?php
namespace App\Repositories;

use App\Models\ProjectEmployee;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Throwable;

class ProjectEmployeeRepository extends BaseRepository{
    public function __construct(ProjectEmployee $model )
    {
        parent::__construct($model);    
    }
}
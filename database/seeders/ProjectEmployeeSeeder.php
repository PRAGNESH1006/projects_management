<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;

class ProjectEmployeeSeeder extends Seeder
{
    public function run(): void
    {
        $projects = Project::all();
        $employees = User::where('role', 'employee')->get();

        if ($projects->count() > 0 && $employees->count() >= 3) {
            foreach ($projects as $project) {
                $assignedEmployees = $employees->random(3);
                foreach ($assignedEmployees as $employee) {
                    $project->users()->attach($employee->id);
                }
            }
        }
    }
}
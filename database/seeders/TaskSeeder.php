<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TaskSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::where('role', 'admin')->first();
        $employees = User::where('role', 'employee')->get();
        $projects = Project::all();


        if ($admin && $employees->count() >= 3 && $projects->count() >= 3) {
            foreach ($projects as $project) {

                $assignedEmployees = $employees->random(3);


                Task::updateOrCreate([
                    'id' => Str::uuid(),
                ], [
                    'title' => "Project Kickoff for {$project->title}",
                    'description' => "Initiate the project with a kickoff meeting to align team members on objectives, deliverables, and timelines. Define roles and responsibilities, and establish communication protocols.",
                    'status' => 'pending',
                    'project_id' => $project->id,
                    'assigned_to' => $assignedEmployees[0]->id,
                    'start_date' => '2024-01-01',
                    'end_date' => '2024-01-10',
                    'created_by' => $admin->id,
                    'updated_by' => $admin->id,
                ]);


                Task::updateOrCreate([
                    'id' => Str::uuid(),
                ], [
                    'title' => "Feature Development for {$project->title}",
                    'description' => "Begin development of the key features identified in the project requirements document. This includes coding, designing, and testing the features based on agreed-upon specifications.",
                    'status' => 'in_progress',
                    'project_id' => $project->id,
                    'assigned_to' => $assignedEmployees[1]->id,
                    'start_date' => '2024-02-01',
                    'end_date' => '2024-04-30',
                    'created_by' => $admin->id,
                    'updated_by' => $admin->id,
                ]);


                Task::updateOrCreate([
                    'id' => Str::uuid(),
                ], [
                    'title' => "Quality Assurance for {$project->title}",
                    'description' => "Perform thorough testing and quality assurance procedures to ensure that all features meet the required standards. This includes bug fixing, performance testing, and user acceptance testing.",
                    'status' => 'completed',
                    'project_id' => $project->id,
                    'assigned_to' => $assignedEmployees[2]->id,
                    'start_date' => '2024-05-01',
                    'end_date' => '2024-06-30',
                    'created_by' => $admin->id,
                    'updated_by' => $admin->id,
                ]);
            }
        }
    }
}
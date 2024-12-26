<?php
namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        
        $admin = User::where('role', 'admin')->first();
        $client = User::where('role', 'client')->get();
        $employee = User::where('role', 'employee')->get();

        if ($admin && $client && $employee) {
          
            Project::updateOrCreate([
                'id' => Str::uuid(),
            ], [
                'name' => 'Project Horizon',
                'description' => 'A cutting-edge research and development project aimed at launching a new software platform that revolutionizes the way businesses manage their data workflows. The goal is to improve operational efficiency and provide clients with real-time insights into their business processes.',
                'client_id' => $client[0]->id,
                'created_by' => $admin->id,
                'updated_by' => $admin->id,
                'start_date' => '2024-01-15',
                'end_date' => '2024-12-31',
            ]);
            
            Project::updateOrCreate([
                'id' => Str::uuid(),
            ], [
                'name' => 'Project Titan',
                'description' => 'A large-scale infrastructure project focused on upgrading the company\'s IT infrastructure. The project will involve data center expansions, cloud migrations, and security enhancements to ensure scalability and future-proofing of the organization\'s technology stack.',
                'client_id' => $client[1]->id,
                'created_by' => $admin->id,
                'updated_by' => $admin->id,
                'start_date' => '2024-03-01',
                'end_date' => '2024-11-30',
            ]);
            
            Project::updateOrCreate([
                'id' => Str::uuid(),
            ], [
                'name' => 'Project Eclipse',
                'description' => 'A collaborative product development initiative designed to create a new consumer-facing mobile app that integrates with wearable devices. This app will provide personalized fitness recommendations, track user progress, and offer insights based on machine learning algorithms.',
                'client_id' => $client[2]->id,
                'created_by' => $admin->id,
                'updated_by' => $admin->id,
                'start_date' => '2024-02-15',
                'end_date' => '2024-10-31',
            ]);
            
        } 
    }
}
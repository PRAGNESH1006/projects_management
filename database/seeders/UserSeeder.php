<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    public function run(): void
    {
      
        User::updateOrCreate([
            'id' => Str::uuid(),
        ], [
            'name' => 'Pragnesh Padhiyar',
            'email' => 'admin@example.com',
            'password' => bcrypt('password123'),
            'role' => 'admin',
            'created_by' => null,
            'updated_by' => null,
        ]);

        // Client User
        User::updateOrCreate([
            'id' => Str::uuid(),
        ], [
            'name' => 'Mihir Kaptan',
            'email' => 'client@example.com',
            'password' => bcrypt('password123'),
            'role' => 'client',
            'created_by' => null,
            'updated_by' => null,
        ]);
        User::updateOrCreate([
            'id' => Str::uuid(),
        ], [
            'name' => 'Aman Mehta',
            'email' => 'client2@example.com',
            'password' => bcrypt('password123'),
            'role' => 'client',
            'created_by' => null,
            'updated_by' => null,
        ]);
        User::updateOrCreate([
            'id' => Str::uuid(),
        ], [
            'name' => 'Shivam Gandhi',
            'email' => 'client3@example.com',
            'password' => bcrypt('password123'),
            'role' => 'client',
            'created_by' => null,
            'updated_by' => null,
        ]);

        // Employee User
        User::updateOrCreate([
            'id' => Str::uuid(),
        ], [
            'name' => 'Anil Mehta',
            'email' => 'employee@example.com',
            'password' => bcrypt('password123'),
            'role' => 'employee',
            'created_by' => null,
            'updated_by' => null,
        ]);
        User::updateOrCreate([
            'id' => Str::uuid(),
        ], [
            'name' => 'Sonal Patel',
            'email' => 'employee2@example.com',
            'password' => bcrypt('password123'),
            'role' => 'employee',
            'created_by' => null,
            'updated_by' => null,
        ]);
        User::updateOrCreate([
            'id' => Str::uuid(),
        ], [
            'name' => 'Yash Solanki',
            'email' => 'employee3@example.com',
            'password' => bcrypt('password123'),
            'role' => 'employee',
            'created_by' => null,
            'updated_by' => null,
        ]);
    }
}
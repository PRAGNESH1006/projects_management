<?php

use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Mail\TaskDueDateReminderMail;
use App\Models\Task;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
Route::get('/email-preview/{task}', function (Task $task) {
    $task->load('assignedUser');
    if ($task->assignedUser) {
        return new TaskDueDateReminderMail($task);
    } else {
        return response()->json(['error' => 'Task does not have an assigned user.'], 404);
    }
}); 

Route::middleware('auth')->group(function () {

    Route::get('/tasks/search', [TaskController::class, 'search'])->name('tasks.search');
    Route::resource('tasks', TaskController::class);

    Route::get('/projects/search', [ProjectController::class, 'search'])->name('projects.search');
    Route::resource('projects', ProjectController::class);

    Route::middleware(['role:admin'])->group(function () {

        Route::get('admin/dashboard', [AdminController::class, 'show'])->name('admin.dashboard');
        Route::get('allClients', [ClientController::class, 'index'])->name('client.index');
        Route::get('allEmployees', [EmployeeController::class, 'index'])->name('employee.index');
        Route::resource('users', UserController::class);
    });
    Route::middleware(['role:client'])->group(function () {
        Route::get('client/dashboard', [ClientController::class, 'show'])->name('client.dashboard');
        Route::get('client/{user}/tasks', [ClientController::class, 'tasks'])->name('client.tasks');
        Route::get('client/{user}/projects', [ClientController::class, 'projects'])->name('client.projects');
    });

    Route::middleware(['role:employee'])->group(function () {
        Route::get('employee/dashboard', [EmployeeController::class, 'show'])->name('employee.dashboard');
        Route::get('employee/{user}/tasks', [EmployeeController::class, 'tasks'])->name('employee.tasks');
        Route::get('employee/{user}/projects', [EmployeeController::class, 'projects'])->name('employee.projects');
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';

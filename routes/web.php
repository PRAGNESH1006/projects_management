<?php

use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\EmployeeDashboardController;
use App\Http\Controllers\ClientDashboardController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
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


Route::middleware('auth')->group(function () {
    Route::resource('tasks', TaskController::class);
    Route::resource('projects', ProjectController::class);
    // Route::resource('client-details', ClientDetailController::class);

    Route::middleware(['role:admin'])->group(function () {

        Route::get('admin/dashboard', [AdminDashboardController::class, 'show'])->name('admin.dashboard');
        Route::get('allClients', [ClientDashboardController::class, 'index'])->name('client.index');
        Route::get('allEmployees', [EmployeeDashboardController::class, 'index'])->name('employee.index');
        Route::resource('users', UserController::class);
    });
    Route::middleware(['role:client'])->group(function () {
        Route::get('client/dashboard', [ClientDashboardController::class, 'show'])->name('client.dashboard');
        Route::get('client/{user}/tasks', [ClientDashboardController::class, 'tasks'])->name('client.tasks');
        Route::get('client/{user}/projects', [ClientDashboardController::class, 'projects'])->name('client.projects');
    });

    Route::middleware(['role:employee'])->group(function () {
        Route::get('employee/dashboard', [EmployeeDashboardController::class, 'show'])->name('employee.dashboard');
        Route::get('employee/{user}/tasks', [EmployeeDashboardController::class, 'tasks'])->name('employee.tasks');
        Route::get('employee/{user}/projects', [EmployeeDashboardController::class, 'projects'])->name('employee.projects');
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';

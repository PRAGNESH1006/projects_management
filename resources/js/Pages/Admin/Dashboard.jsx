import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProjectCard from '@/Components/ProjectCard';

export default function Dashboard({
    projectCount,
    taskCount,
    clientCount,
    employeeCount,
    recentProjects,
    recentTasks,
    recentClients,
    recentEmployees,
}) {
    return (
        <AuthenticatedLayout>
            <Head title="Admin Dashboard" />
            <div className='container mx-auto px-4'>
                <div className="flex flex-col md:flex-row justify-between items-center py-4 mb-6 border-b">
                    <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
                    <button className="mt-4 md:mt-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform ">
                        Create New Admin
                    </button>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white rounded-lg shadow-md overflow-hidden ">
                        <div class="p-6">
                            <div class="flex items-center justify-between mb-4">
                                <h2 class="text-xl font-semibold text-gray-800">Employees</h2>
                                <svg class="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z">
                                    </path>
                                </svg>
                            </div>
                            <p class="text-3xl font-bold text-gray-700">{employeeCount}</p>
                            <p class="text-gray-600">Total Employees</p>
                            <div class="mt-4 flex justify-between">
                                <a href={route('users.create', { role: "employee" })}
                                    class="text-sm text-yellow-500 hover:underline flex items-center">
                                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 4v16m8-8H4"></path>
                                    </svg>
                                    Create
                                </a>
                                <a href={route('employee.index')}
                                    class="text-sm text-yellow-500 hover:underline flex items-center">
                                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"></path>
                                    </svg>
                                    Show All
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white rounded-lg shadow-md overflow-hidden ">
                        <div class="p-6">
                            <div class="flex items-center justify-between mb-4">
                                <h2 class="text-xl font-semibold text-gray-800">Clients</h2>
                                <svg class="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z">
                                    </path>
                                </svg>
                            </div>
                            <p class="text-3xl font-bold text-gray-700">{clientCount}</p>
                            <p class="text-gray-600">Total Clients</p>
                            <div class="mt-4 flex justify-between">
                                <a href={route('users.create', { role: 'client' })}
                                    class="text-sm text-purple-500 hover:underline flex items-center">
                                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 4v16m8-8H4"></path>
                                    </svg>
                                    Create
                                </a>
                                <a href="{{ route('client.index') }}"
                                    class="text-sm text-purple-500 hover:underline flex items-center">
                                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"></path>
                                    </svg>
                                    Show All
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white rounded-lg shadow-md overflow-hidden ">
                        <div class="p-6">
                            <div class="flex items-center justify-between mb-4">
                                <h2 class="text-xl font-semibold text-gray-800">Projects</h2>
                                <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01">
                                    </path>
                                </svg>
                            </div>
                            <p class="text-3xl font-bold text-gray-700">{projectCount}</p>
                            <p class="text-gray-600">Total Projects</p>
                            <div class="mt-4 flex justify-between">
                                <a href={route('projects.create')}
                                    class="text-sm text-blue-500 hover:underline flex items-center">
                                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 4v16m8-8H4"></path>
                                    </svg>
                                    Create
                                </a>
                                <a href={route('projects.index')}
                                    class="text-sm text-blue-500 hover:underline flex items-center">
                                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d= "M3 4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"></path>
                                    </svg>
                                    Show All
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white rounded-lg shadow-md overflow-hidden ">
                        <div class="p-6">
                            <div class="flex items-center justify-between mb-4">
                                <h2 class="text-xl font-semibold text-gray-800">Tasks</h2>
                                <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4">
                                    </path>
                                </svg>
                            </div>
                            <p class="text-3xl font-bold text-gray-700">{taskCount}</p>
                            <p class="text-gray-600">Total Tasks</p>
                            <div class="mt-4 flex justify-between">
                                <a href={route('tasks.create')}
                                    class="text-sm text-green-500 hover:underline flex items-center">
                                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 4v16m8-8H4"></path>
                                    </svg>
                                    Create
                                </a>
                                <a href={route('tasks.index')}
                                    class="text-sm text-green-500 hover:underline flex items-center">
                                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"></path>
                                    </svg>
                                    Show All
                                </a>
                            </div>
                        </div>
                    </div>


                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Projects</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {recentProjects.length === 0 ? (
                            <div className="col-span-full text-center text-gray-500">No recent projects found</div>
                        ) : (
                            recentProjects.map(project => (
                               <div key={project.id}>
                                <p>{project.title}</p>
                                <p></p>
                               </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Tasks</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {recentTasks.length === 0 ? (
                            <div className="col-span-full text-center text-gray-500">No recent tasks found</div>
                        ) : (
                            recentTasks.map(task => (
                                <div key={task.id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                                    <h3 className="text-xl font-semibold text-gray-700">{task.title}</h3>
                                    <p className="text-gray-500 mt-1">{task.project.title} </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Clients</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {recentClients.length === 0 ? (
                            <div className="col-span-full text-center text-gray-500">No recent clients found</div>
                        ) : (
                            recentClients.map(client => (
                                <div key={client.id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                                    <h3 className="text-xl font-semibold text-gray-700">{client.name}</h3>
                                    <p className="text-gray-500 mt-1">{client.email}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Employees</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {recentEmployees.length === 0 ? (
                            <div className="col-span-full text-center text-gray-500">No recent employees found</div>
                        ) : (
                            recentEmployees.map(employee => (
                                <div key={employee.id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                                    <h3 className="text-xl font-semibold text-gray-700">{employee.name}</h3>
                                    <p className="text-gray-500 mt-1">{employee.email}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

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
            <div className="container mx-auto px-6 py-8">
                <h1 className="text-4xl font-semibold text-gray-900 mb-8">Admin Dashboard</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <h2 className="text-lg font-medium text-gray-700">Projects</h2>
                        <p className="text-3xl font-semibold text-blue-600 mt-2">{projectCount}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <h2 className="text-lg font-medium text-gray-700">Tasks</h2>
                        <p className="text-3xl font-semibold text-green-600 mt-2">{taskCount}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <h2 className="text-lg font-medium text-gray-700">Clients</h2>
                        <p className="text-3xl font-semibold text-yellow-600 mt-2">{clientCount}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <h2 className="text-lg font-medium text-gray-700">Employees</h2>
                        <p className="text-3xl font-semibold text-purple-600 mt-2">{employeeCount}</p>
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Projects</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {recentProjects.length === 0 ? (
                            <div className="col-span-full text-center text-gray-500">No recent projects found</div>
                        ) : (
                            recentProjects.map(project => (
                                <div key={project.id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                                    <h3 className="text-xl font-semibold text-gray-700">{project.name}</h3>
                                    <p className="text-gray-500 mt-1">{project.client.name}</p>
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
                                    <h3 className="text-xl font-semibold text-gray-700">{task.name}</h3>
                                    <p className="text-gray-500 mt-1">{task.project.name}</p>
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

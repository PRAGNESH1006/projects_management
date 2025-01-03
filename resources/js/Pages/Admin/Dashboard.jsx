import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import DashboardCard from '@/Components/DashboardCard';
import RecentSection from '@/Components/RecentSection';
import CreateUserModal from '@/Components/CreateUserModal';

export default function Dashboard({
    projectCount,
    clientCount,
    employeeCount,
    recentProjects,
    recentTasks,
    recentClients,
    recentEmployees,
    allTaskCompletionStats
}) {
    const taskCount = allTaskCompletionStats.total;
    const pieChartData = [
        { name: 'Projects', value: projectCount, color: '#3B82F6' },
        { name: 'Tasks', value: taskCount, color: '#10B981' },
        { name: 'Clients', value: clientCount, color: '#8B5CF6' },
        { name: 'Employees', value: employeeCount, color: '#F59E0B' },
    ];

    const pieChartTasksData = [
        { name: 'Completed', value: allTaskCompletionStats.completed, color: '#10B981' },
        { name: 'In Progress', value: allTaskCompletionStats.in_progress, color: '#F59E0B' },
        { name: 'Pending', value: allTaskCompletionStats.pending, color: '#F87171' },
        { name: 'Overdue', value: allTaskCompletionStats.overdue, color: '#EF4444' },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Admin Dashboard">
            </Head>
            <div className='container mx-auto px-4 pb-2'>
                <div className="flex flex-col md:flex-row justify-between items-center py-4 mb-6 border-b">
                    <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>

                    <div className='space-x-2'>
                        <Link href={route('users.index')} className='inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded-md transition-colors duration-300'>All Users</Link>
                        <CreateUserModal role={"admin"} />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
                    <DashboardCard title="Employees" count={employeeCount} icon="👥" color="bg-yellow-500" viewRoute="employee.index" />
                    <DashboardCard title="Clients" count={clientCount} icon="🤝" color="bg-purple-500" viewRoute="client.index" />
                    <DashboardCard title="Projects" count={projectCount} icon="📊" color="bg-blue-500" viewRoute="projects.index" />
                    <DashboardCard title="Tasks" count={taskCount} icon="✅" color="bg-green-500" viewRoute="tasks.index" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Overview</h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={pieChartData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {pieChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Task Overview</h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={pieChartTasksData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {pieChartTasksData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 ">
                    <RecentSection title="Recent Projects" items={recentProjects} viewAllRoute="projects.index" />
                    <RecentSection title="Recent Tasks" items={recentTasks} viewAllRoute="tasks.index" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <RecentSection title="Recent Clients" items={recentClients} viewAllRoute="client.index" />
                    <RecentSection title="Recent Employees" items={recentEmployees} viewAllRoute="employee.index" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


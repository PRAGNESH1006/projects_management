import React, { useState } from 'react';
import { Head} from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import DashboardCard from '@/Components/DashboardCard';
import RecentSection from '@/Components/RecentSection';
import CreateUserModal from '@/Components/CreateUserModal';

const customStyles = `
    .scrollbar-thin::-webkit-scrollbar {
        width: 6px;
    }
    .scrollbar-thin::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
    .scrollbar-thin::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 3px;
    }
    .scrollbar-thin::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`;

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
    const [modalOpen, setModalOpen] = useState(false);

    const handleCloseModal = () => setModalOpen(false);
    const handleOpenModal = () => setModalOpen(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted');
        handleCloseModal();
    };

    const pieChartData = [
        { name: 'Projects', value: projectCount, color: '#3B82F6' },
        { name: 'Tasks', value: taskCount, color: '#10B981' },
        { name: 'Clients', value: clientCount, color: '#8B5CF6' },
        { name: 'Employees', value: employeeCount, color: '#F59E0B' },
    ];

    console.log(recentProjects)
    return (
        <AuthenticatedLayout>
            <Head title="Admin Dashboard">
                <style>{customStyles}</style>
            </Head>
            <div className="min-h-screen bg-gray-100">
                <div className="py-6">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>
                            <CreateUserModal role={"admin"}/>
                        </div>

                        <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
                            <DashboardCard title="Employees" count={employeeCount} icon="👥" color="bg-yellow-500" createRoute="users.create" viewRoute="employee.index" />
                            <DashboardCard title="Clients" count={clientCount} icon="🤝" color="bg-purple-500" createRoute="users.create" viewRoute="client.index" />
                            <DashboardCard title="Projects" count={projectCount} icon="📊" color="bg-blue-500" createRoute="projects.create" viewRoute="projects.index" />
                            <DashboardCard title="Tasks" count={taskCount} icon="✅" color="bg-green-500" createRoute="tasks.create" viewRoute="tasks.index" />
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
                                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
                                    <ul className="space-y-4">
                                        <li className="flex items-center space-x-3">
                                            <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">Project</span>
                                            <span>New project "Website Redesign" created</span>
                                        </li>
                                        <li className="flex items-center space-x-3">
                                            <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">Task</span>
                                            <span>Task "Update homepage" completed</span>
                                        </li>
                                        <li className="flex items-center space-x-3">
                                            <span className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">Client</span>
                                            <span>New client "Tech Solutions Inc." added</span>
                                        </li>
                                        <li className="flex items-center space-x-3">
                                            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">Employee</span>
                                            <span>New employee "John Doe" joined</span>
                                        </li>
                                    </ul>
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
                </div>
            </div>

        </AuthenticatedLayout>
    );
}


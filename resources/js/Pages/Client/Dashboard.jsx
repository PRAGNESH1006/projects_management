import DashboardCard from '@/Components/DashboardCard';
import RecentSection from '@/Components/RecentSection';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function Dashboard({ projects, tasks }) {
    const clientCount = 0;
    const projectsCount = projects.length;
    const tasksCount = tasks.length;
    const pieChartData = [
        { name: 'Projects', value: projectsCount, color: '#4CAF50' },
        { name: 'Tasks', value: tasksCount, color: '#FFC107' },
        // { name: 'Overdue', value: overdueTasks, color: '#F44336' },
    ];
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className='container mx-auto px-4 pb-2'>
                <div className="flex flex-col md:flex-row justify-between items-center py-4 mb-6 border-b">
                    <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
                </div>

                <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
                    {/* <DashboardCard title="Clients" count={clientCount} icon="🤝" color="bg-purple-500" createRoute="users.create" viewRoute="client.index" /> */}
                    <DashboardCard title="Projects" count={projectsCount} icon="📊" color="bg-blue-500" viewRoute="projects.index" />
                    <DashboardCard title="Tasks" count={tasksCount} icon="✅" color="bg-green-500" viewRoute="tasks.index" />
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
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                        dataKey="value"
                                    >
                                        {pieChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <RecentSection
                        title="Recent Activities"
                        items={projects}
                        viewAllRoute="tasks.index"
                        itemType="activity"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 ">
                    <RecentSection
                        title="Recent Tasks"
                        items={tasks}
                        viewAllRoute="tasks.index"
                        itemType="task"
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

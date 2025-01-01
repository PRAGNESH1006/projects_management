import DashboardCard from '@/Components/DashboardCard';
import RecentSection from '@/Components/RecentSection';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head ,usePage} from '@inertiajs/react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function Dashboard({ tasks, tasksCount, projectsCount, projects }) {
    const authUser = usePage().props.auth.user;
    const pieChartData = [
        { name: 'Projects', value: projectsCount, color: '#3B82F6' },
        { name: 'Tasks', value: tasksCount, color: '#10B981' },
        // { name: 'Clients', value: clientCount, color: '#8B5CF6' },
        // { name: 'Employees', value: employeeCount, color: '#F59E0B' },
    ];
    return (
        <AuthenticatedLayout>
            <Head title="Employees" />
            <div className='container mx-auto px-4 pb-2'>
                <div className="flex flex-col md:flex-row justify-between items-center py-4 mb-6 border-b">
                    <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
                </div>
                
                <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
                    {/* <DashboardCard title="Clients" count={clientCount} icon="🤝" color="bg-purple-500" createRoute="users.create" viewRoute="client.index" /> */}
                    <DashboardCard title="Projects" count={projectsCount} icon="📊" color="bg-blue-500" viewRoute="projects.index" />
                    <DashboardCard title="Tasks" count={tasksCount} icon="✅" color="bg-green-500" viewRoute="tasks.index" />
                </div>
                <div className="grid grid-cols-1 gap-8 mb-8">
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
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 ">
                    <RecentSection title="Recent Projects" items={projects} viewAllRoute="projects.index" />
                    <RecentSection title="Recent Tasks" items={tasks} viewAllRoute="tasks.index" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

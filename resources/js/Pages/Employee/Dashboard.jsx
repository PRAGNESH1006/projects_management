import Chart from '@/Components/Chart';
import DashboardCard from '@/Components/DashboardCard';
import RecentSection from '@/Components/RecentSection';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard({
    tasksCount,
    completedTasks,
    pendingTasks,
    overdueTasks,
    taskRatio,
    recentTasks,
    recentActivities,
    projects,
    projectsCount,
}) {
    const pieChartData = [
        { name: 'Completed', value: completedTasks, color: '#4CAF50' },
        { name: 'Pending', value: pendingTasks, color: '#FFC107' },
        { name: 'Overdue', value: overdueTasks, color: '#F44336' },
    ];
    return (
        <AuthenticatedLayout  header={"Employee Dashboard"}>
            <div className='container mx-auto px-4 pb-2'>
                <div className="flex flex-col md:flex-row justify-between items-center py-4 mb-6 border-b">
                    <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
                </div>

                <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
                    <DashboardCard title="Projects" count={projectsCount} icon="📊" color="bg-blue-500"/>
                    <DashboardCard title="Tasks" count={tasksCount} icon="✅" color="bg-green-500" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Overview</h2>
                            <Chart pieChartData={pieChartData}/>
                        </div>
                    </div>
                    <RecentSection
                        title="Recent Activities"
                        items={recentActivities}
                        itemType="activity"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 ">
                    <RecentSection
                        title="Recent Tasks"
                        items={recentTasks}
                        viewAllRoute="tasks.index"
                        itemType="task"
                    />

                    <RecentSection
                        title="Recent Projects"
                        items={projects}
                        viewAllRoute="projects.index"
                        itemType="project"
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

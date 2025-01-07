import Chart from '@/Components/Chart';
import DashboardCard from '@/Components/DashboardCard';
import RecentSection from '@/Components/RecentSection';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard({ projects, tasks }) {
    const completedTasks = tasks.filter(task => task.status === "completed").length;
    const pendingTasks = tasks.filter(task => task.status === "pending").length;
    const inProgressTasks = tasks.filter(task => task.status === "in_progress").length;
    const overDueTasks = tasks.filter(task => {
        const endDate = new Date(task.end_date);
        const currentDate = new Date();
        return endDate < currentDate && task.status !== "completed";
    }).length;

    const projectsCount = projects.length;
    const tasksCount = tasks.length;

    const pieChartData = [
        { name: 'Complete Tasks', value: completedTasks, color: '#4CAF50' },
        { name: 'Pending Tasks', value: pendingTasks, color: '#03A9F4' },
        { name: 'In Progress Tasks', value: inProgressTasks, color: '#FF9800' },
        { name: 'Overdue Tasks', value: overDueTasks, color: '#F44336' },
    ];

    const dashboardCards = [
        { title: "Projects", count: projectsCount, icon: "📊", color: "bg-blue-500", viewRoute: "projects.index" },
        { title: "Tasks", count: tasksCount, icon: "✅", color: "bg-green-500", viewRoute: "tasks.index" },
    ];

    return (
        <AuthenticatedLayout header={"Client Dashboard"}>
            <div className='container mx-auto px-4 pb-2'>
                <div className="flex flex-col md:flex-row justify-between items-center py-4 mb-6 border-b">
                    <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
                </div>
                <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
                    {dashboardCards.map((card, index) => (
                        <DashboardCard
                            key={index}
                            title={card.title}
                            count={card.count}
                            icon={card.icon}
                            color={card.color}
                            viewRoute={card.viewRoute}
                        />
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Overview</h2>
                            <Chart pieChartData={pieChartData} />
                        </div>
                    </div>
                    <RecentSection
                        title="Recent Activities"
                        items={projects}
                        viewAllRoute="projects.index"
                        itemType="activity"
                    />
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

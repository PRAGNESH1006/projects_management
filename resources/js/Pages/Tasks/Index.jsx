import TaskCard from '@/Components/TaskCard'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, usePage } from '@inertiajs/react'
import React from 'react'

export default function Index({ tasks }) {
    const user = usePage().props.auth.user;
    return (
        <AuthenticatedLayout>
            <Head title="Tasks" />
            <div className='container mx-auto px-4 overflow-hidden'>
                <div className="flex flex-col md:flex-row justify-between items-center py-4 mb-6 border-b">
                    <h1 className="text-3xl font-semibold text-gray-800">Tasks</h1>
                    <Link href={route(`tasks.create`)} className="mt-4 md:mt-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform ">
                        Create New Tasks
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-h-[80%] overflow-hidden scrollbar-hide">
                    {tasks.length === 0 ? (
                        <div className="col-span-full text-center text-gray-500 overflow-auto">No Tasks found</div>
                    ) : (
                        tasks.map(task => (
                            <TaskCard key={task.id} task={task} role={user?.role} />
                        ))
                    )}
                </div>

            </div>
        </AuthenticatedLayout>
    )
}

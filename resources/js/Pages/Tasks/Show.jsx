import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'
import React from 'react'

export default function Show({ task }) {
  if (!task) {
    return (
      <AuthenticatedLayout>
        <Head title="Task Details" />
        <div className="container mx-auto px-4 py-8 max-w-[700px]">
          <p className="text-center text-xl text-red-500">Task not found!</p>
        </div>
      </AuthenticatedLayout>
    )
  }

  const formatDate = (date) => {
    return date ? new Date(date).toLocaleDateString() : 'N/A';
  }

  return (
    <AuthenticatedLayout>
      <Head title="Task Details" />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Task Details</h1>
          <Link href={route('tasks.index')}
            className="mt-4 md:mt-0 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1">
            Back to Tasks
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Task Title</label>
              <p className="mt-1 block w-full">{task.title || 'N/A'}</p>
            </div>

            <div>
              <label htmlFor="project_id" className="block text-sm font-medium text-gray-700">Project</label>
              <p className="mt-1 block w-full">{task.project?.title || 'N/A'}</p>
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
              <p className="mt-1 block w-full">{task.status || 'N/A'}</p>
            </div>

            <div>
              <label htmlFor="assigned_user" className="block text-sm font-medium text-gray-700">Assigned Employee</label>
              <p className="mt-1 block w-full">{task.assigned_user?.name || 'N/A'}</p>
            </div>

            <div>
              <label htmlFor="created_by" className="block text-sm font-medium text-gray-700">Created By</label>
              <p className="mt-1 block w-full">{task.creator?.name || 'N/A'}</p>
            </div>

            <div>
              <label htmlFor="updated_by" className="block text-sm font-medium text-gray-700">Updated By</label>
              <p className="mt-1 block w-full">{task.updater?.name || 'N/A'}</p>
            </div>

            <div>
              <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Start Date</label>
              <p className="mt-1 block w-full">{formatDate(task.start_date)}</p>
            </div>

            <div>
              <label htmlFor="due_date" className="block text-sm font-medium text-gray-700">Due Date</label>
              <p className="mt-1 block w-full">{formatDate(task.end_date)}</p>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}

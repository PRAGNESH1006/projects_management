import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'
import InputLabel from '@/Components/InputLabel'
import React from 'react'
import moment from 'moment/moment'

export default function Show({ task, auth }) {



  return (
    <AuthenticatedLayout header={"Task Details"}>
      {!task ?
        (<div className="container mx-auto px-4 py-8 max-w-[700px]">
          <p className="text-center text-xl text-red-500">Task not found!</p>
        </div>)
        :
        (<div className="container mx-auto px-4 py-8 max-w-[700px]">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Task Details</h1>
            <div className="flex space-x-4">
              <Link href={auth?.user?.role === 'admin' ? route('tasks.index') : route(`${auth?.user?.role}.tasks`, auth?.user?.id)}
                className="mt-4 md:mt-0 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1">
                Back
              </Link>
              <Link href={route('tasks.edit', task.id)}
                className="mt-4 md:mt-0 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1">
                Edit
              </Link>
            </div>

          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <InputLabel htmlFor="title" className="block text-sm font-medium text-gray-700" value={"Task Title"} />
                <p className="mt-1 block w-full">{task.title || 'N/A'}</p>
              </div>

              <div>
                <InputLabel htmlFor="project_id" className="block text-sm font-medium text-gray-700" value={"Project"} />
                <p className="mt-1 block w-full">{task.project?.title || 'N/A'}</p>
              </div>

              <div>
                <InputLabel htmlFor="status" className="block text-sm font-medium text-gray-700" value={"Status"} />
                <p className="mt-1 block w-full">{task.status || 'N/A'}</p>
              </div>

              <div>
                <InputLabel htmlFor="assigned_user" className="block text-sm font-medium text-gray-700" value={"Assigned Employee"} />
                <p className="mt-1 block w-full">{task.assigned_user?.name || 'N/A'}</p>
              </div>

              <div>
                <InputLabel htmlFor="created_by" className="block text-sm font-medium text-gray-700" value={"Created By"} />
                <p className="mt-1 block w-full">{task.creator?.name || 'N/A'}</p>
              </div>

              <div>
                <InputLabel htmlFor="updated_by" className="block text-sm font-medium text-gray-700" value={"Updated By"} />
                <p className="mt-1 block w-full">{task.updater?.name || 'N/A'}</p>
              </div>

              <div>
                <InputLabel htmlFor="start_date" className="block text-sm font-medium text-gray-700" value={"Start Date"} />
                <p className="mt-1 block w-full">{moment(task.start_date).format("dddd, MMMM Do YYYY")}</p>
              </div>

              <div>
                <InputLabel htmlFor="due_date" className="block text-sm font-medium text-gray-700" value={"Due Date"} />
                <p className="mt-1 block w-full">{moment(task.end_date).format("dddd, MMMM Do YYYY")}</p>
              </div>
            </div>
          </div>
        </div>)}
    </AuthenticatedLayout>
  )
}

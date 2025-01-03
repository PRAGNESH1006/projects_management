import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import { useState } from 'react';

const ProjectDetails = ({ project }) => {
    const user = usePage().props.auth.user;
    const [isDeleting, setIsDeleting] = useState(false);
    const { delete: destroy } = useForm();

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            setIsDeleting(true);
            destroy(route('projects.destroy', project.id), {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => setIsDeleting(false),
                onError: () => setIsDeleting(false),
            });
        }
    };

    return (
        <AuthenticatedLayout header={"Project Details"}>
            <div className="bg-gray-100 min-h-screen py-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 sm:p-10">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                                <h1 className="text-3xl font-bold text-white">{project?.title}</h1>
                                <div className="flex flex-wrap gap-2">
                                    <Link
                                        href={route(user.role === 'admin' ? 'projects.index' : `${user.role}.projects`, user.id)}
                                        className="inline-flex items-center px-4 py-2 bg-white text-blue-700 rounded-md hover:bg-blue-50 transition duration-300"
                                    >
                                        <svg
                                            className="w-5 h-5 mr-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                            />
                                        </svg>
                                        Back
                                    </Link>
                                    {(user.id === project.created_by || user.role === 'admin') && (
                                        <>
                                            <Link
                                                href={route('projects.edit', project.id)}
                                                className="inline-flex items-center px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={handleDelete}
                                                disabled={isDeleting}
                                                className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 disabled:opacity-50"
                                            >
                                                {isDeleting ? 'Deleting...' : 'Delete'}
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="p-6 sm:p-10 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-gray-50 rounded-lg p-6 shadow-md space-y-4">
                                    <h2 className="text-2xl font-semibold text-gray-900">Project Information</h2>
                                    <p><span className="font-medium text-gray-700">Project Id:</span> {project.id}</p>
                                    <p><span className="font-medium text-gray-700">Description:</span> {project.description}</p>
                                    <p><span className="font-medium text-gray-700">Start Date:</span> {new Date(project.start_date).toLocaleDateString()}</p>
                                    <p><span className="font-medium text-gray-700">End Date:</span> {new Date(project.end_date).toLocaleDateString()}</p>
                                    <p><span className="font-medium text-gray-700">Created At:</span> {new Date(project.created_at).toLocaleDateString()}</p>
                                    <p><span className="font-medium text-gray-700">Updated At:</span> {new Date(project.updated_at).toLocaleDateString()}</p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-6 shadow-md space-y-6">
                                    <h2 className="text-2xl font-semibold text-gray-900">Team</h2>
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">Client</h3>
                                        <p className="text-gray-600">{project.client ? project.client.name : 'N/A'}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">Created By</h3>
                                        <p className="text-gray-600">{project.creator.name}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">Updated By</h3>
                                        <p className="text-gray-600">{project.updater?.name || 'Not Updated'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Tasks</h2>
                                {project.tasks.length > 0 ? (
                                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                                        {project.tasks.map((task) => (
                                            <div key={task.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                                                <h3 className="font-semibold text-lg text-gray-900">{task.title}</h3>
                                                <p className="text-gray-600 mt-2">{task.description}</p>
                                                <div className="mt-4 flex justify-between items-center">
                                                    <span
                                                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                                            task.status === 'completed'
                                                                ? 'bg-green-100 text-green-800'
                                                                : task.status === 'in_progress'
                                                                ? 'bg-yellow-100 text-yellow-800'
                                                                : 'bg-red-100 text-red-800'
                                                        }`}
                                                    >
                                                        {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                                                    </span>
                                                    <span className="text-sm text-gray-500">
                                                        {task.assignedUser ? task.assignedUser.name : 'Unassigned'}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-gray-400 mt-2">
                                                    Created: {new Date(task.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-600">No tasks assigned to this project yet.</p>
                                )}
                            </div>

                            <div className="mt-8">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Project Team Members</h2>
                                {project.users.length > 0 ? (
                                    <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                                        {project.users.map((user) => (
                                            <div key={user.id} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
                                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <span className="text-2xl font-semibold text-blue-600">
                                                        {user.name.slice(0, 2).toUpperCase()}
                                                    </span>
                                                </div>
                                                <p className="font-medium text-gray-900">{user.name}</p>
                                                <p className="text-sm text-gray-600">{user.role}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-600">No employees assigned to this project yet.</p>
                                )}
                            </div>

                            {project.client && project.client.clientDetail && (
                                <div className="mt-8">
                                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Client Details</h2>
                                    <div className="bg-gray-50 rounded-lg p-6 shadow-md">
                                        <p><span className="font-medium text-gray-700">Company Name:</span> {project.client.clientDetail.company_name}</p>
                                        <p className="mt-4"><span className="font-medium text-gray-700">Contact Number:</span> {project.client.clientDetail.contact_number}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ProjectDetails;


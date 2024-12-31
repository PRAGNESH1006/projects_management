import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useForm } from '@inertiajs/react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

export default function ProjectCard({ project, role }) {
    const { delete: destroy } = useForm();
    const [isDeleting, setIsDeleting] = useState(false);
    const truncatedDescription = project?.description.length > 100
        ? project?.description.slice(0, 100) + '...'
        : project?.description;

    const handleDelete = (e) => {
        e.preventDefault();
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
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div className="p-6">
                <div className="flex items-center justify-between mb-4 h-[1rem]">
                    <h2 className="text-xl font-bold text-gray-900">{project?.title}</h2>
                </div>
                <p className="text-gray-600 text-sm mb-4 h-[4rem] ">{truncatedDescription}</p>
                <div className="flex justify-between items-center text-sm h-[1rem]">
                    <Link
                        href={route('projects.show', project?.id)}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                        <FaEye className="mr-2" />
                        <span>View Details</span>
                    </Link>
                    {role === "admin" && (
                        <div className="flex space-x-4">
                            <Link
                                href={route('projects.edit', project?.id)}
                                className="inline-flex items-center text-yellow-600 hover:text-yellow-800 transition-colors duration-200"
                            >
                                <FaEdit className="mr-2" />
                                <span>Edit</span>
                            </Link>
                            <form
                                action={route('projects.destroy', project?.id)}
                                method="POST"
                                onSubmit={handleDelete}
                            >
                                <input type="hidden" name="_method" value="DELETE" />
                                <button
                                    type="submit"
                                    className="flex items-center text-red-600 hover:text-red-800 space-x-2"
                                    disabled={isDeleting}
                                >
                                    <FaTrash />
                                    {isDeleting ? 'Deleting...' : 'Delete'}
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

ProjectCard.propTypes = {
    project: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired,
    role: PropTypes.oneOf(['employee', 'client', 'admin']).isRequired,
    
};

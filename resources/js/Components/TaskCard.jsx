import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@inertiajs/react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

export default function TaskCard({ task, role }) {
    const truncatedDescription = task?.description.length > 100
    ? task?.description.slice(0, 100) + '...'
    : task?.description; 
    return (
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-lg font-semibold text-center">{task?.name}</h2>
            <p className="text-center text-sm text-gray-500">{truncatedDescription}</p>

            <div className="mt-4 text-center">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                    {task?.name.charAt(0).toUpperCase() + task?.name.charAt(1).toUpperCase()}
                </span>
            </div>

            <div className="mt-4 flex justify-center space-x-6">
                <Link 
                    href={route('tasks.show', task?.id)} 
                    className="flex items-center text-blue-600 hover:text-blue-800 space-x-2"
                >
                    <FaEye />
                    <span>View</span>
                </Link>

                {role === "admin" && (
                    <>
                        <Link 
                            href={route('tasks.edit', task?.id)} 
                            className="flex items-center text-yellow-600 hover:text-yellow-800 space-x-2"
                        >
                            <FaEdit />
                            <span>Edit</span>
                        </Link>

                        <form 
                            action={route('tasks.destroy', task?.id)} 
                            method="POST" 
                            onSubmit={(e) => {
                                if (!window.confirm('Are you sure you want to delete this task?')) {
                                    e.preventDefault();
                                }
                            }}
                        >
                            <button 
                                type="submit" 
                                className="flex items-center text-red-600 hover:text-red-800 space-x-2"
                            >
                                <FaTrash />
                                <span>Delete</span>
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}

TaskCard.propTypes = {
    task: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired,
    role: PropTypes.string.isRequired,
};

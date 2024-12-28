import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useForm } from '@inertiajs/react';
import { FaEllipsisV } from 'react-icons/fa';

export default function TaskCard({ task, role }) {
    const { delete: destroy } = useForm();
    const [isDeleting, setIsDeleting] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const shortDescription = task?.description.length > 100
        ? task?.description.slice(0, 100) + '...'
        : task?.description;

    const shortName = task?.name.length > 20
        ? task?.name.slice(0, 20) + '...'
        : task?.name;

    const handleDelete = (e) => {
        e.preventDefault();
        if (window.confirm('Are you sure you want to delete this task?')) {
            setIsDeleting(true);
            destroy(route('tasks.destroy', task.id), {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => setIsDeleting(false),
                onError: () => setIsDeleting(false),
            });
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className='h-[2rem] flex justify-between items-center'>
                <h2 className="text-md font-semibold text-left">{shortName}</h2>
                <div className='relative'>
                    <FaEllipsisV className='text-sm font-thin cursor-pointer' onClick={toggleDropdown} />
                    {dropdownOpen && (
                        <div className='absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg'>
                            <Link
                                href={route('tasks.show', task?.id)}
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                            >
                                View
                            </Link>
                            {role === "admin" && (
                                <>
                                    <Link
                                        href={route('tasks.edit', task?.id)}
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                                    >
                                        Edit
                                    </Link>
                                    <div
                                        className='block cursor-pointer px-4 py-2 text-gray-800 hover:bg-gray-200'
                                        onClick={handleDelete}
                                        disabled={isDeleting}
                                    >
                                        {isDeleting ? 'Deleting...' : 'Delete'}
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <p className="text-gray-600 text-sm h-[4rem]">{shortDescription}</p>
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

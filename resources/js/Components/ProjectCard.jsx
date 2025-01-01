import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link,useForm  } from '@inertiajs/react';
import { FaEllipsisV } from 'react-icons/fa';
import DropdownMenu from './DropdownMenu';

export default function ProjectCard({ project, role }) {
    const { delete: destroy } = useForm();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    const shortDescription = project?.description.length > 100
        ? project?.description.slice(0, 100) + '...'
        : project?.description;

    const shortName = project?.title.length > 20
        ? project?.title.slice(0, 20) + '...'
        : project?.title;


    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-200 text-yellow-800';
            case 'in-progress': return 'bg-blue-200 text-blue-800';
            case 'completed': return 'bg-green-200 text-green-800';
            default: return 'bg-gray-200 text-gray-800';
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out max-w-xs w-full">
            <div className='flex justify-between items-center mb-4'>
                <h2 className="text-lg font-semibold text-gray-800 truncate">{shortName}</h2>
                <div className='flex items-center'>
                    {role === "admin" && (
                        <div className='relative'>
                            <FaEllipsisV
                                className='text-xl text-gray-600 cursor-pointer'
                                onClick={toggleDropdown}
                            />
                            <DropdownMenu
                                isOpen={dropdownOpen}
                                onClose={closeDropdown}
                                item={project}
                                type="projects"  
                                destroy={destroy}
                            />

                        </div>
                    )}
                </div>
            </div>

            <p className="text-gray-600 text-sm mt-2 h-20 overflow-hidden">{shortDescription}</p>

            <div className="mt-4 flex justify-end">
                <Link
                    href={route('projects.show', project?.id)}
                    className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md transition-colors duration-300"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}

ProjectCard.propTypes = {
    project: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired,
    role: PropTypes.oneOf(['employee', 'client', 'admin']).isRequired,

};

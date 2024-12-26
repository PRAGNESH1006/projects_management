import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@inertiajs/react';

export default function ProjectCard({ project }) {

    return (
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-center">{project?.name}</h2>
            <p className="text-center text-gray-500">{project?.description}</p>

            <div className="mt-4 text-center">
                <span className={`px-2 py-1 text-xs font-medium rounded-full `}>
                    {project?.name.charAt(0).toUpperCase() + project?.name.slice(1)}
                </span>
            </div>
            <div className="mt-4 flex justify-center space-x-4">
                <Link href={route('projects.show', project?.id)} className="text-blue-600 hover:text-blue-800">View</Link>

                <Link href={route('projects.edit', project?.id)} className="text-yellow-600 hover:text-yellow-800">Edit</Link>
                <form action={route('projects.destroy', project?.id)} method="POST" onSubmit={(e) => {
                    if (!window.confirm('Are you sure you want to delete this project?')) {
                        e.preventDefault();
                    }
                }}>
                    <button type="submit" className="text-red-600 hover:text-red-800">Delete</button>
                </form>
            </div>
        </div>
    );
}

ProjectCard.propTypes = {
    project: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        // role: PropTypes.string.isRequired,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired,
};

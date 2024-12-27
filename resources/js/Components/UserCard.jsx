import React from 'react';
import PropTypes from 'prop-types';
import { Link, useForm } from '@inertiajs/react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const AVATAR_URL = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F013%2F042%2F571%2Foriginal%2Fdefault-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg&f=1&nofb=1';

export default function UserCard({ user, role }) {
    const roleClass = user?.role === 'admin' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white';
    const { delete: deleteUser } = useForm();

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            deleteUser(route('users.destroy', user?.id));
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-center mb-4">
                <img
                    src={AVATAR_URL}
                    alt={user?.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-300"
                />
            </div>
            <h2 className="text-2xl font-semibold text-center text-gray-800">{user?.name}</h2>
            <p className="text-center text-gray-600">{user?.email}</p>

            <div className="mt-4 text-center">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${roleClass}`}>
                    {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
                </span>
            </div>

            <div className="mt-4 flex justify-center space-x-6">
                <Link
                    href={route('users.show', user?.id)}
                    className="flex items-center text-blue-600 hover:text-blue-800 space-x-2"
                >
                    <FaEye />
                    <span>View</span>
                </Link>

                {role === 'admin' && (
                    <>
                        <Link
                            href={route('users.edit', user?.id)}
                            className="flex items-center text-yellow-600 hover:text-yellow-800 space-x-2"
                        >
                            <FaEdit />
                            <span>Edit</span>
                        </Link>

                        <button
                            onClick={handleDelete}
                            className="flex items-center text-red-600 hover:text-red-800 space-x-2"
                        >
                            <FaTrash />
                            <span>Delete</span>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

UserCard.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired,
};

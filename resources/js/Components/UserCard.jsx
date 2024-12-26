import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@inertiajs/react';

const AVATAR_URL = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F013%2F042%2F571%2Foriginal%2Fdefault-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg&f=1&nofb=1';

export default function UserCard({ user }) {
    const roleClass = user?.role === 'admin' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white';

    return (
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-center mb-4">
                <img
                    src={AVATAR_URL}
                    alt={user?.name}
                    className="w-24 h-24 rounded-full object-cover"
                />
            </div>
            <h2 className="text-xl font-semibold text-center">{user?.name}</h2>
            <p className="text-center text-gray-500">{user?.email}</p>

            <div className="mt-4 text-center">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${roleClass}`}>
                    {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
                </span>
            </div>
            <div className="mt-4 flex justify-center space-x-4">
                <Link href={route('users.show', user?.id)} className="text-blue-600 hover:text-blue-800">View</Link>
                {user?.role === 'admin' && (
                    <>
                        <Link href={route('users.edit', user?.id)} className="text-yellow-600 hover:text-yellow-800">Edit</Link>
                        <form action={route('users.destroy', user?.id)} method="POST" onSubmit={(e) => {
                            if (!window.confirm('Are you sure you want to delete this user?')) {
                                e.preventDefault();
                            }
                        }}>
                            <button type="submit" className="text-red-600 hover:text-red-800">Delete</button>
                        </form>
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

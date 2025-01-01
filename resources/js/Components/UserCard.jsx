import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaEllipsisV } from 'react-icons/fa';
import DropdownMenu from './DropdownMenu';
import { useForm } from '@inertiajs/react'

const AVATAR_URL = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F013%2F042%2F571%2Foriginal%2Fdefault-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg&f=1&nofb=1';

export default function UserCard({ user, role }) {
    const { delete: destroy } = useForm();
    const [isDeleting, setIsDeleting] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const roleClass = user?.role === 'admin' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white';

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-center items-center mb-4 relative">
                <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                    <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                </span>
                {role === "admin" && (
                    <div className='absolute top-2 right-2'>
                        <FaEllipsisV
                            className='text-lg text-gray-600 cursor-pointer hover:text-gray-800'
                            onClick={toggleDropdown}
                        />
                        <DropdownMenu
                            isOpen={dropdownOpen}
                            onClose={closeDropdown}
                            onView={route('users.show', user.id)}
                            onEdit={route('users.edit', user.id)}
                            item={user}
                            type="users"
                            destroy={destroy}
                            setIsDeleting={setIsDeleting}
                        />
                    </div>
                )}
            </div>
            <h2 className="text-xl font-medium text-center text-gray-800">{user?.name}</h2>
            <p className="text-center text-gray-500">{user?.email}</p>
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

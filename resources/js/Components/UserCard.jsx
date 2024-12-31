import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaEllipsisV } from 'react-icons/fa';
import DropdownMenu from './DropdownMenu';
import {useForm} from '@inertiajs/react'

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
                <img
                    src={AVATAR_URL}
                    alt={user?.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                />
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

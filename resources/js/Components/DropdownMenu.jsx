import React, { useRef, useEffect, useState } from 'react';
import {  FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link } from '@inertiajs/react';

function DropdownMenu({ isOpen, onClose, item, type, destroy }) {
    const dropdownRef = useRef(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onClose();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const handleDelete = (e) => {
        e.preventDefault();
        const routePath = route(`${type}.destroy`, item.id);

        if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
            setIsDeleting(true);
            destroy(routePath, {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setIsDeleting(false);
                    onClose();
                },
                onError: () => {
                    setIsDeleting(false);
                    alert(`Failed to delete ${type}. Please try again.`);
                },
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div
            ref={dropdownRef}
            className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden transition-all duration-200 ease-in-out transform origin-top-right"
            style={{
                opacity: isOpen ? 1 : 0,
                visibility: isOpen ? 'visible' : 'hidden',
                transform: isOpen ? 'scale(1)' : 'scale(0.95)',
            }}
        >
            <div className="py-1">
                <Link
                    href={route(`${type}.edit`, item.id)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-150 ease-in-out focus:outline-none focus:bg-indigo-50 focus:text-indigo-700"
                >
                    <FaEdit className="inline-block mr-2" /> Edit
                </Link>
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors duration-150 ease-in-out focus:outline-none focus:bg-red-50 focus:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FaTrashAlt className="inline-block mr-2" />
                    {isDeleting ? "Deleting..." : "Delete"}
                </button>
            </div>
        </div>
    );
}

export default DropdownMenu;


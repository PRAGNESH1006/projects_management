import React, { useRef, useEffect } from 'react';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link } from '@inertiajs/react';

function DropdownMenu({ isOpen, onClose, onView, onEdit, item, type, destroy, setIsDeleting }) {
    const dropdownRef = useRef(null);

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
        const routePath = route(`${type}.destroy`, item.id)

        if (window.confirm('Are you sure you want to delete this ' + type + '?')) {
            destroy(routePath, {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => setIsDeleting(false),
                onError: () => setIsDeleting(false),
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div ref={dropdownRef} className="absolute  mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
            <Link href={onView} className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 flex items-center gap-2">
                <FaEye /> View
            </Link>
            <Link href={onEdit} className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 flex items-center gap-2">
                <FaEdit /> Edit
            </Link>
            <button
                onClick={handleDelete}
                className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 flex items-center gap-2"
            >
                <FaTrashAlt /> {!setIsDeleting ? ("Deleting") : ("Delete")}
            </button>
        </div>
    );
}

export default DropdownMenu;

import React, { useState } from 'react';
import Modal from '@/Components/Modal';
import { Link, useForm } from '@inertiajs/react';

function ViewUserDetailsModal({ user }) {
    const [modalOpen, setModalOpen] = useState(false);
    const handleCloseModal = () => setModalOpen(false);
    const handleOpenModal = () => setModalOpen(true);
    const [isDeleting, setIsDeleting] = useState(false);

    const { delete: destroy } = useForm();
    const handleDelete = (e) => {
        e.preventDefault();

        if (window.confirm(`Are you sure you want to delete this ${user?.role}?`)) {
            setIsDeleting(true);
            destroy(route(`users.destroy`, user.id), {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setIsDeleting(false);
                },
                onError: () => {
                    setIsDeleting(false);
                    alert(`Failed to delete ${user?.role}. Please try again.`);
                },
            });
        }
    };
    return (
        <>
            <button
                onClick={handleOpenModal}
                className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded-md transition-colors duration-300"
            >
                View
            </button>

            <Modal show={modalOpen} onClose={handleCloseModal} maxWidth="md">
                <div className="p-6">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">{user?.role.charAt(0).toUpperCase() + user?.role.slice(1)} Details</h2>
                    <div className="space-y-4 text-sm">
                        <div>
                            <p className="font-medium text-gray-700">Name:</p>
                            <p className="text-gray-900">{user?.name || 'N/A'}</p>
                        </div>
                        <div>
                            <p className="font-medium text-gray-700">Email:</p>
                            <p className="text-gray-900">{user?.email || 'N/A'}</p>
                        </div>
                        <div>
                            <p className="font-medium text-gray-700">Role:</p>
                            <p className="text-gray-900">{user?.role || 'N/A'}</p>
                        </div>
                        {user?.role === 'client' && (
                            <>
                                <div>
                                    <p className="font-medium text-gray-700">Company Name:</p>
                                    <p className="text-gray-900">{user?.client_detail?.company_name || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-700">Contact Number:</p>
                                    <p className="text-gray-900">{user?.client_detail?.contact_number || 'N/A'}</p>
                                </div>
                            </>
                        )}
                        <div>
                            <p className="font-medium text-gray-700">Last Updated:</p>
                            <p className="text-gray-900">{new Date(user?.updated_at).toLocaleString() || 'N/A'}</p>
                        </div>
                    </div>
                    <div className="mt-6 text-right flex justify-between">
                        <div className='space-x-4'>
                            <Link href={route('users.edit',user?.id)} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded-md transition-colors duration-300">
                                Edit
                            </Link>
                            <button onClick={handleDelete} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-medium rounded-md transition-colors duration-300">
                                {isDeleting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                        <button
                            onClick={handleCloseModal}
                            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white text-xs font-medium rounded-md transition-colors duration-300"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default ViewUserDetailsModal;

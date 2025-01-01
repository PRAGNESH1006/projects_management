import React, { useState, useEffect } from 'react';
import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

function UpdateUserModal({ user }) {
    const [modalOpen, setModalOpen] = useState(false);
    const { data, setData, put, processing, errors, reset } = useForm({
        name: user?.name || '',
        email: user?.email || '',
        password: '',
        company_name: user?.company_name || '',
        contact_number: user?.contact_number || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('users.update', user.id), {
            onSuccess: () => {
                reset();
                setModalOpen(false);
            },
            onError: () => {
                reset('password', 'password_confirmation');
                console.log(errors);
            },
        });
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        reset();
    };

    const handleOpenModal = () => setModalOpen(true);

    useEffect(() => {
        reset({
            name: user?.name || '',
            email: user?.email || '',
            role: user?.role,
            company_name: user?.company_name || '',
            contact_number: user?.contact_number || '',
        });
    }, [user]);

    return (
        <>
            <button
                onClick={handleOpenModal}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
                Update
                 {/* {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)} */}
            </button>

            <Modal show={modalOpen} onClose={handleCloseModal} maxWidth="md">
                <div className="p-6">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        Update {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
                    </h2>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="mt-4">
                            <InputLabel htmlFor="name" value="Name" />
                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                autoComplete="name"
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                autoComplete="email"
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        {user?.role === 'client' && (
                            <>
                                <div className="mt-4">
                                    <InputLabel htmlFor="company_name" value="Company Name" />
                                    <TextInput
                                        id="company_name"
                                        type="text"
                                        name="company_name"
                                        value={data.company_name}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        onChange={(e) => setData('company_name', e.target.value)}
                                    />
                                    <InputError message={errors.company_name} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="contact_number" value="Contact Number" />
                                    <TextInput
                                        id="contact_number"
                                        type="text"
                                        name="contact_number"
                                        value={data.contact_number}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        onChange={(e) => setData('contact_number', e.target.value)}
                                    />
                                    <InputError message={errors.contact_number} className="mt-2" />
                                </div>
                            </>
                        )}

                        <div className="mt-4 col-span-2">
                            <PrimaryButton className="w-full" processing={processing}>
                                Update {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}

export default UpdateUserModal;

import React, { useState, useEffect } from 'react';
import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

function CreateUserModal({ role }) {
    const [modalOpen, setModalOpen] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        role: role,
        password_confirmation: '',
        company_name: '',
        contact_number: '',
    });


    const handleSubmit = (e) => {
        e.preventDefault();

        if (data.password !== data.password_confirmation) {
            alert('Password and Confirm Password do not match');
            reset('password', 'password_confirmation');
            return;
        }
        post(route('users.store'), {
            onSuccess: () => {
                reset()
                setModalOpen(false);
            },
            onError: () => {
                reset('password', 'password_confirmation');
            },
        });

    };
    const handleCloseModal = () => {
        setModalOpen(false)
        reset()
    };
    const handleOpenModal = () => setModalOpen(true);

    useEffect(() => {
        reset();
    }, [role]);

    return (
        <>
            <button
                onClick={handleOpenModal}
                className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded-md transition-colors duration-300"
            >
                Create {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>

            <Modal show={modalOpen} onClose={handleCloseModal} maxWidth="md" >
                <div className="p-6 ">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Create New {role.charAt(0).toUpperCase() + role.slice(1)}</h2>

                    <form onSubmit={handleSubmit} className="">
                        <div className="mt-4 ">
                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1  block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Name"
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1  block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                autoComplete="email"
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Email"
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1  block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                autoComplete="password"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Password"
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1  block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                autoComplete="password_confirmation"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                placeholder="Confirm Password"
                            />
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        {role === 'client' && (
                            <>
                                <div className="mt-4">
                                    <TextInput
                                        id="company_name"
                                        type="text"
                                        name="company_name"
                                        value={data.company_name}
                                        className="mt-1  block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        onChange={(e) => setData('company_name', e.target.value)}
                                        placeholder="Company Name"
                                    />
                                    <InputError message={errors.company_name} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <TextInput
                                        id="contact_number"
                                        type="text"
                                        name="contact_number"
                                        value={data.contact_number}
                                        className="mt-1  block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        onChange={(e) => setData('contact_number', e.target.value)}
                                        placeholder="Contact Number"
                                    />
                                    <InputError message={errors.contact_number} className="mt-2" />
                                </div>
                            </>
                        )}

                        <div className="mt-4 col-span-2">
                            <PrimaryButton className="w-full" processing={processing}>
                                Create {role.charAt(0).toUpperCase() + role.slice(1)}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}

export default CreateUserModal;
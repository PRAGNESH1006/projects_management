import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import ReactSelect from '@/Components/ReactSelect';
import { Transition } from '@headlessui/react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Create({ clients, employees }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        client_id: '',
        employee_ids: [],
        start_date: null,
        end_date: null,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        post(route('projects.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setIsSubmitting(false);
            },
            onError: () => {
                setIsSubmitting(false);
            },
        });
    };

    const clientOptions = clients.map(client => ({ value: client.id, label: client.name }));
    const employeeOptions = employees.map(employee => ({ value: employee.id, label: employee.name }));

    return (
        <AuthenticatedLayout>
            <Head title="Create Project" />
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Create New Project</h1>
                    <Link
                        href={route('projects.index')}
                        className="mt-4 md:mt-0 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"
                    >
                        Back to Projects
                    </Link>
                </div>

                <form onSubmit={submit} className="bg-white shadow-xl rounded-lg p-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <InputLabel htmlFor="title" value="Project Title" />
                            <TextInput
                                id="title"
                                type="text"
                                name="title"
                                value={data.title}
                                className="mt-1 block w-full"
                                autoComplete="title"
                                isFocused={true}
                                onChange={(e) => setData('title', e.target.value)}
                            />
                            <InputError message={errors.title} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="description" value="Description" />
                            <textarea
                                id="description"
                                name="description"
                                value={data.description}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                rows="3"
                                onChange={(e) => setData('description', e.target.value)}
                            />
                            <InputError message={errors.description} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="client_id" value="Assign Client" />
                            <ReactSelect
                                id="client_id"
                                name="client_id"
                                options={clientOptions}
                                value={data.client_id}
                                onChange={(selectedOption) => setData('client_id', selectedOption.value)}
                                className="mt-1"
                                isClearable={true}
                            />
                            <InputError message={errors.client_id} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="employee_ids" value="Assign Employees" />
                            <ReactSelect
                                id="employee_ids"
                                name="employee_ids"
                                isMulti
                                closeMenuOnSelect={false}
                                options={employeeOptions}
                                value={data.employee_ids}
                                onChange={(selectedOptions) => setData('employee_ids', selectedOptions.map(option => option.value))}
                                className="mt-1"
                            />
                            <InputError message={errors.employee_ids} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="start_date" value="Start Date" />
                            <DatePicker
                                id="start_date"
                                selected={data.start_date}
                                onChange={(date) => setData('start_date', date)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                dateFormat="dd-MM-yyyy"
                                placeholderText="Select start date"
                            />
                            <InputError message={errors.start_date} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="end_date" value="End Date" />
                            <DatePicker
                                id="end_date"
                                selected={data.end_date}
                                onChange={(date) => setData('end_date', date)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                dateFormat="dd-MM-yyyy"
                                placeholderText="Select end date"
                                minDate={data.start_date}
                            />
                            <InputError message={errors.end_date} className="mt-2" />
                        </div>
                    </div>

                    <div className="mt-6">
                        <Transition
                            show={isSubmitting}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 rounded-lg">
                                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
                            </div>
                        </Transition>
                        <PrimaryButton
                            type="submit"
                            className="w-full justify-center bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                            disabled={processing || isSubmitting}
                        >
                            {isSubmitting ? 'Creating Project...' : 'Create Project'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}


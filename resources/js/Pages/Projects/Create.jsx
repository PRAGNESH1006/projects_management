import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Create({ clients, employees }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        client_id: '',
        employee_ids: [],
        start_date: '',
        end_date: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('projects.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Create Project" />
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center py-4 mb-6 border-b">
                    <h1 className="text-3xl font-semibold text-gray-800">Create Project</h1>
                    <Link href={route('projects.index')} className="mt-4 md:mt-0 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform">
                        Back to Projects
                    </Link>
                </div>

                <form onSubmit={submit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="mt-4">
                        <InputLabel htmlFor="title" value="Project Title" />
                        <TextInput
                            id="title"
                            type="text"
                            name="title"
                            value={data.title}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            autoComplete="title"
                            isFocused={true}
                            onChange={(e) => setData('title', e.target.value)}
                        />
                        <InputError message={errors.title} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="description" value="Description" />
                        <TextInput
                            id="description"
                            type="text"
                            name="description"
                            value={data.description}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            autoComplete="description"
                            onChange={(e) => setData('description', e.target.value)}
                        />
                        <InputError message={errors.description} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="client_id" value="Assign Client" />
                        <select
                            id="client_id"
                            name="client_id"
                            value={data.client_id}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            onChange={(e) => setData('client_id', e.target.value)}
                        >
                            <option value="">Select Client</option>
                            {clients.map(client => (
                                <option key={client.id} value={client.id}>{client.name}</option>
                            ))}
                        </select>
                        <InputError message={errors.client_id} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="employee_ids" value="Assign Employees" />
                        <div className="space-y-2">
                            {employees.map(employee => (
                                <div key={employee.id} className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        name="employee_ids[]"
                                        value={employee.id}
                                        id={`employee_${employee.id}`}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        onChange={(e) => {
                                            const checked = e.target.checked;
                                            setData('employee_ids', checked
                                                ? [...data.employee_ids, employee.id]
                                                : data.employee_ids.filter(id => id !== employee.id));
                                        }}
                                    />
                                    <label htmlFor={`employee_${employee.id}`} className="text-sm text-gray-700">
                                        {employee.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <InputError message={errors.employee_ids} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="start_date" value="Start Date" />
                        <TextInput
                            id="start_date"
                            type="date"
                            name="start_date"
                            value={data.start_date}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            onChange={(e) => setData('start_date', e.target.value)}
                        />
                        <InputError message={errors.start_date} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="end_date" value="End Date" />
                        <TextInput
                            id="end_date"
                            type="date"
                            name="end_date"
                            value={data.end_date}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            onChange={(e) => setData('end_date', e.target.value)}
                        />
                        <InputError message={errors.end_date} className="mt-2" />
                    </div>

                    <div className="mb-6 ">
                        <PrimaryButton processing={processing} className=" bg-indigo-600 hover:bg-indigo-700 transition duration-300 ease-in-out transform">
                            Create Project
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

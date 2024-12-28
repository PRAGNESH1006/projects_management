import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'

import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput'; 
import ReactSelect from '@/Components/ReactSelect';
import React from 'react'

export default function Create({ employees, projects, statuses }) {
    // console.log(statuses)   
    
    const { data, setData, post, errors, reset } = useForm({
        name: '',
        description: '',
        project_id: '',
        assigned_to: '',
        start_date: '',
        end_date: '',
        status: '', 
    });

    return (
        <AuthenticatedLayout>
            <Head title="Create Task" />

            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center py-4 mb-6 border-b">
                    <h1 className="text-3xl font-semibold text-gray-800">Create Task</h1>
                    <Link href={route('tasks.index')} className="mt-4 md:mt-0 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform">
                        Back to Tasks
                    </Link>
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        post(route('tasks.store'));
                    }}
                    className="grid grid-cols-1 gap-6 md:grid-cols-2"
                >
                    <div className="mt-4">
                        <InputLabel htmlFor="name" value="Task Name" />
                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-4">  
                        <InputLabel htmlFor="description" value="Description" />
                        <TextInput
                            id="description"
                            type="text"
                            name="description"
                            value={data.description}
                            className="mt-1 block w-full"
                            autoComplete="description"
                            onChange={(e) => setData('description', e.target.value)}
                        />
                        <InputError message={errors.description} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="project_id" value="Project" />
                        <select
                            id="project_id"
                            name="project_id"
                            value={data.project_id}
                            onChange={(e) => setData('project_id', e.target.value)}
                            className="mt-1 block w-full rounded-md"
                        >
                            <option value="">Select a Project</option>
                            {projects.map((project) => (
                                <option key={project.id} value={project.id}>
                                    {project.name}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.project_id} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="assigned_to" value="Assign Employee" />
                        <select
                            id="assigned_to"
                            name="assigned_to" 
                            value={data.assigned_to} 
                            onChange={(e) => setData('assigned_to', e.target.value)}
                            className="mt-1 block w-full rounded-md"
                        >
                            <option value="">Select an Employee</option>
                            {employees.map((employee) => (
                                <option key={employee.id} value={employee.id}>
                                    {employee.name}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.assigned_to} className="mt-2" />  
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="start_date" value="Start Date" />
                        <TextInput
                            id="start_date"
                            type="date"
                            name="start_date"
                            value={data.start_date}
                            className="mt-1 block w-full"
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
                            className="mt-1 block w-full"
                            onChange={(e) => setData('end_date', e.target.value)}
                        />
                        <InputError message={errors.end_date} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="status" value="Status" />
                        <ReactSelect
                            id="status"
                            name="status"
                            value={data.status}
                            onChange={(value) => setData('status', value?.value)}
                            options={statuses}
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.status} className="mt-2" /> 
                    </div>

                    <div className="mt-12">
                        <PrimaryButton>Create Task</PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

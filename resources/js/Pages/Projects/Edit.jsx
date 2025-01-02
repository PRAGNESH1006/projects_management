import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import ReactSelect from '@/Components/ReactSelect';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Update({ clients, employees, project }) {
  const { data, setData, patch, errors, reset } = useForm({
    title: project.title || '',
    description: project.description || '',
    client_id: project.client_id || '',
    employee_ids: [],
    start_date: project.start_date || null,
    end_date:project.end_date || null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    patch(route('projects.update', project.id), {
      preserveScroll: true,
      onSuccess: () => {
        setIsSubmitting(false);
        reset();
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
      <Head title="Update Project Details" />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Update Project Details</h1>
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
              <InputLabel htmlFor="employee_ids" value="Assign Employees" />
              <ReactSelect
                id="employee_ids"
                name="employee_ids"
                isMulti
                closeMenuOnSelect={false}
                options={employeeOptions}
                value={employeeOptions.filter(option => data.employee_ids.includes(option.value))}
                onChange={(selectedOptions) =>
                  setData(
                    'employee_ids',
                    selectedOptions ? selectedOptions.map(option => option.value) : []
                  )
                }
                className="mt-1"
                isClearable={true}
                placeholder="Select Employees"
              />
              <InputError message={errors.employee_ids} className="mt-2" />
            </div>
            <div>
              <InputLabel htmlFor="client_id" value="Assign Client" />
              <ReactSelect
                id="client_id"
                name="client_id"
                options={clientOptions}
                value={data.client_id}
                onChange={(selectedOption) => setData('client_id', selectedOption.value)}
                className="mt-1 "
                isClearable={true}
                placeholder="Select a Client"
              />
              <InputError message={errors.client_id} className="mt-2" />
            </div>

            <div className='flex gap-6 '>
              <div>
                <InputLabel htmlFor="start_date" value="Start Date" />
                <DatePicker
                  id="start_date"
                  selected={data.start_date}
                  onChange={(date) => setData('start_date', date)}
                  className="mt-1 block  w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  dateFormat="dd-MM-yyyy"
                  placeholderText="Select date"
                />
                <InputError message={errors.start_date} className="mt-2" />
              </div>
              <div>
                <InputLabel htmlFor="end_date" value="End Date" />
                <DatePicker
                  id="end_date"
                  selected={data.end_date}
                  onChange={(date) => setData('end_date', date)}
                  className="mt-1 block  w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  dateFormat="dd-MM-yyyy"
                  placeholderText="Select date"
                  minDate={data.start_date}
                />
                <InputError message={errors.end_date} className="mt-2" />
              </div>
            </div>
          </div>
          <div className='mt-6'>
            <InputLabel htmlFor="description" value="Description" />
            <textarea
              id="description"
              name="description"
              value={data.description}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows="4"
              onChange={(e) => setData('description', e.target.value)}
            />
            <InputError message={errors.description} className="mt-2" />
          </div>
          <div className="flex items-center justify-end mt-6">
            <PrimaryButton className="ml-4">
              Update Project
            </PrimaryButton>
          </div>

        </form>
      </div>
    </AuthenticatedLayout>
  );
}


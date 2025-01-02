import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import ReactSelect from '@/Components/ReactSelect';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function Edit({ task, statuses, employees, project }) {
  const user = usePage().props.auth.user;
  const { data, setData, patch, errors, reset } = useForm({
    title: task.title,
    description: task.description,
    project_id: project.project_id,
    assigned_to: task.assigned_to,
    start_date: task.start_date,
    end_date: task.end_date,
    status: task.status,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    patch(route('tasks.update', task.id));
    reset()
  };
  return (
    <AuthenticatedLayout>
      <Head title="Create Task" />

      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Update Task </h1>
          <Link
            href={route(user.role === 'admin' ? 'tasks.index' : `${user.role}.tasks`, user.id)}
            className="mt-4 md:mt-0 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Back to Tasks
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <InputLabel htmlFor="title" value="Task Title" />
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
                <InputLabel htmlFor="project_id" value="Project" />
                <TextInput
                  id="project_id"
                  name="project_id"
                  value={data.project_id}
                  placeholder={project.title}
                  className="mt-1 block w-full"
                  readOnly={true}
                />
                <InputError message={errors.project_id} className="mt-2" />
              </div>

              <div>
                <InputLabel htmlFor="assigned_to" value="Assign Employee" />
                <TextInput
                  id="assigned_to"
                  name="assigned_to"
                  value={employees.name}
                  placeholder={employees.name}
                  className="mt-1 block w-full"
                  readOnly={true}
                />
                <InputError message={errors.assigned_to} className="mt-2" />
              </div>
              <div className='flex gap-6 '>
                <div>
                  <InputLabel htmlFor="start_date" value="Start Date" />
                  <DatePicker
                    id="start_date"
                    selected={data.start_date}
                    onChange={(date) => setData('start_date', date)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    dateFormat="dd-MM-yyyy"
                    placeholderText="Select date"
                    minDate={data.start_date}
                  />
                  <InputError message={errors.end_date} className="mt-2" />
                </div>
              </div>
            </div>
            <div>
              <InputLabel htmlFor="status" value="Status" />
              <ReactSelect
                id="status"
                name="status"
                value={data.status}
                onChange={(option) => setData('status', option?.value)}
                options={statuses}
                placeholder="Select Status"
                className="mt-1 block w-full"
              />
              <InputError message={errors.status} className="mt-2" />
            </div>
            <div>
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
                Update Task
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default Edit;

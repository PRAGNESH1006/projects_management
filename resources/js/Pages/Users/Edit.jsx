import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';

export default function Edit({ user }) {
  const { data, setData, put, processing, errors, reset } = useForm({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role,
    client_detail_id: user?.client_detail?.id,
    company_name: user?.client_detail?.company_name || '',
    contact_number: user?.client_detail?.contact_number || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('users.update', user.id), {
      onSuccess: () => reset(),
      onError: () => console.log('error'),
    });
  };

  return (
    <AuthenticatedLayout>
      <Head title="Edit User" />
      <div className="container mx-auto px-6 py-12 max-w-2xl">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Update {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)} Details</h1>
          <div className='space-x-4'>
          <Link
            href={route(`${user?.role}.index`)}
            className="mt-4 md:mt-0 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"  
          >
            Back 
          </Link>
          </div>
        </div>
        <div className="bg-gray-50 shadow-lg rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <InputLabel htmlFor="name" label="Name" className="text-lg font-semibold" />
              <TextInput
                name="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                className="mt-2 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <InputError message={errors.name} className="mt-2 text-red-500 text-sm" />
            </div>

            <div>
              <InputLabel htmlFor="email" label="Email" className="text-lg font-semibold" />
              <TextInput
                name="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                className="mt-2 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <InputError message={errors.email} className="mt-2 text-red-500 text-sm" />
            </div>

            {user?.role === 'client' && (
              <>
                <div>
                  <InputLabel htmlFor="company_name" label="Company Name" className="text-lg font-semibold" />
                  <TextInput
                    name="company_name"
                    value={data.company_name}
                    onChange={(e) => setData('company_name', e.target.value)}
                    className="mt-2 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <InputError message={errors.company_name} className="mt-2 text-red-500 text-sm" />
                </div>

                <div>
                  <InputLabel htmlFor="contact_number" label="Contact Number" className="text-lg font-semibold" />
                  <TextInput
                    name="contact_number"
                    value={data.contact_number}
                    onChange={(e) => setData('contact_number', e.target.value)}
                    className="mt-2 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <InputError message={errors.contact_number} className="mt-2 text-red-500 text-sm" />
                </div>
              </>
            )}

            <PrimaryButton
              className=" py-3 px-6  bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              disabled={processing}
            >
              Update {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)} 
            </PrimaryButton>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

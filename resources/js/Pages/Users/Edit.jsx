import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/react'
import React from 'react'

export default function Edit({ user }) {
  console.log(user);
  const { data, setData, put, processing, errors, reset } = useForm({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role,
    company_name: user?.client_detail?.company_name || '',
    contact_number: user?.client_detail?.contact_number || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('users.update', user.id), {
      onSuccess: () => {
        reset();
      },
      onError: () => {
        console.log('error')
      },
    });
  }
  return (
    <AuthenticatedLayout>
      <Head title="Edit User" />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <h1 className="text-3xl font-bold text-gray-900">Edit User</h1>
        <div className='bg-white shadow-md rounded-lg p-6 mt-6'>
          <form onSubmit={handleSubmit}>
            <div>
              <InputLabel htmlFor="name" label="Name" />
              <TextInput
                name="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                className="mt-1 block w-full"
              />
              <InputError message={errors.name} className="mt-2" />
            </div>
            <div>
              <InputLabel htmlFor="email" label="Email" />
              <TextInput
                name="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                className="mt-1 block w-full"
              />
              <InputError message={errors.email} className="mt-2" />
            </div>

            <TextInput name="role" className="hidden" />

            {
              user?.role === 'client' && (
                <>
                  <div>
                    <InputLabel htmlFor="company_name" label="Company Name" />
                    <TextInput
                      name="company_name"
                      value={data.company_name}
                      onChange={(e) => setData('company_name', e.target.value)}
                      className="mt-1 block w-full"
                    />
                    <InputError message={errors.company_name} className="mt-2" />
                  </div>
                  <div>
                    <InputLabel htmlFor="contact_number" label="Contact Number" />
                    <TextInput
                      name="contact_number"
                      value={data.contact_number}
                      onChange={(e) => setData('contact_number', e.target.value)}
                      className="mt-1 block w-full"
                    />
                    <InputError message={errors.contact_number} className="mt-2" />
                  </div>
                </>
              )
            }
            <PrimaryButton className="mt-4">
              Update User
            </PrimaryButton>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}

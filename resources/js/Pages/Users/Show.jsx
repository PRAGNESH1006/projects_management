import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

function Show({ user }) {
  return (
    <AuthenticatedLayout>
      <Head title="User Details" />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{user?.role} Details</h1>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <p className="mt-1 block w-full">{user.name || 'N/A'}</p>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 block w-full">{user.email || 'N/A'}</p>
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
              <p className="mt-1 block w-full">{user.role || 'N/A'}</p>
            </div>

            {user?.role === "client" && (<>
              <div>
                <label htmlFor="company_name" className="block text-sm font-medium text-gray-700">Company Name</label>
                <p className="mt-1 block w-full">{user.client_detail?.company_name || 'N/A'}</p>
              </div>

              <div>
                <label htmlFor="contact_number" className="block text-sm font-medium text-gray-700">Contact Number</label>
                <p className="mt-1 block w-full">{user.client_detail?.contact_number || 'N/A'}</p>
              </div></>)}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}

export default Show
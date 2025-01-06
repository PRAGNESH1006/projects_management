import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
import moment from 'moment';
import React from 'react';

function Show({ user }) {
  return (
    <AuthenticatedLayout header={"User Details"}>
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{user?.role.charAt(0).toUpperCase() + user?.role.slice(1)} Details</h1>
          <div className='flex space-x-4'>
            <Link
              href={route(`${user?.role}.index`)}
              className="mt-4 md:mt-0 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              Back
            </Link>
            <Link
              href={route(`users.edit`, user.id)}
              className="mt-4 md:mt-0 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              Edit
            </Link>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <p className="mt-1 block w-full">{user.name || 'N/A'}</p>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <p className="mt-1 block w-full">{user.email || 'N/A'}</p>
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <p className="mt-1 block w-full">{user.role || 'N/A'}</p>
            </div>

            {user?.role === 'client' && (
              <>
                <div>
                  <label htmlFor="company_name" className="block text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <p className="mt-1 block w-full">{user.client_detail?.company_name || 'N/A'}</p>
                </div>

                <div>
                  <label htmlFor="contact_number" className="block text-sm font-medium text-gray-700">
                    Contact Number
                  </label>
                  <p className="mt-1 block w-full">{user.client_detail?.contact_number || 'N/A'}</p>
                </div>
              </>
            )}

            <div>
              <label htmlFor="updated_at" className="block text-sm font-medium text-gray-700">
                Updated At
              </label>
              <p className="mt-1 block w-full">{moment(user?.updated_at).format("dddd, MMMM Do YYYY") || 'N/A'}</p>
            </div>

            <div>
              <label htmlFor="updated_by" className="block text-sm font-medium text-gray-700">
                Updated By
              </label>
              <p className="mt-1 block w-full">{user?.updated_by?.name || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default Show;




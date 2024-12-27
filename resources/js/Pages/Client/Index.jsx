import UserCard from '@/Components/UserCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head,usePage } from '@inertiajs/react';
import React from 'react';

export default function Index({ clients }) {
        const user = usePage().props.auth.user;
    
    return (
        <AuthenticatedLayout>
            <Head title="Employees" />
            <div className='container mx-auto px-4'>
                <div className="flex flex-col md:flex-row justify-between items-center py-4 mb-6 border-b">
                    <h1 className="text-3xl font-semibold text-gray-800">Clients</h1>
                    <button className="mt-4 md:mt-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform ">
                        Create New Clients
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {clients.length === 0 ? (
                        <div className="col-span-full text-center text-gray-500">No clients found</div>
                    ) : (
                        clients.map(client => (
                            <UserCard key={client.id} user={client} role={user?.role} />
                        ))
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

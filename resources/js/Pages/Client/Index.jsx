import CreateUserModal from '@/Pages/Users/Partials/CreateUserModal';
import UserCard from '@/Pages/Users/Partials/UserCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { usePage } from '@inertiajs/react';
import React from 'react';
import Pagination from '@/Components/Pagination';

export default function Index({ clients }) {
    const user = usePage().props.auth.user;
    console.log(clients)

    return (
        <AuthenticatedLayout  header={"Clients"}>
            <div className='container mx-auto px-4'>
                <div className="flex flex-col md:flex-row justify-between items-center py-4 mb-6 border-b">
                    <h1 className="text-3xl font-semibold text-gray-800">Clients</h1>
                    <CreateUserModal role={"client"} />

                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {clients.data.length === 0 ? (
                        <div className="col-span-full text-center text-gray-500">No clients found</div>
                    ) : (
                        clients.data.map(client => (
                            <UserCard key={client.id} user={client} role={user?.role} />
                        ))
                    )}
                </div>
                <Pagination data={clients}/>
            </div>
        </AuthenticatedLayout>
    );
}

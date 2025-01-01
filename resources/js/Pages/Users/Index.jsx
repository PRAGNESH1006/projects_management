import UserCard from '@/Components/UserCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import React from 'react';

export default function Index({ users }) {
    const authUser = usePage().props.auth.user;
    return (
        <AuthenticatedLayout>
            <Head title="Users" />
            <div className='container mx-auto px-4'>
                <div className="flex flex-col md:flex-row justify-between items-center py-4 mb-6 border-b">
                    <h1 className="text-3xl font-semibold text-gray-800">Users</h1>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {users.length === 0 ? (
                        <div className="col-span-full text-center text-gray-500">No Users found</div>
                    ) : (
                        users.map(user => (
                            <UserCard key={user.id} user={user} role={authUser?.role} />
                        ))
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

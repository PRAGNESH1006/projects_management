import CreateUserModal from '@/Components/CreateUserModal';
import UserCard from '@/Components/UserCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import React from 'react';

export default function Index({ employees }) {
    const user = usePage().props.auth.user;
    return (
        <AuthenticatedLayout>
            <Head title="Employees" />
            <div className='container mx-auto px-4'>
                <div className="flex flex-col md:flex-row justify-between items-center py-4 mb-6 border-b">
                    <h1 className="text-3xl font-semibold text-gray-800">Employees</h1>
                    <CreateUserModal role={"employee"}/>

                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {employees.length === 0 ? (
                        <div className="col-span-full text-center text-gray-500">No employees found</div>
                    ) : (
                        employees.map(employee => (
                            <UserCard key={employee.id} user={employee} role={user?.role} />
                        ))
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

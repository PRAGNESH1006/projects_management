import React from 'react';
import CreateUserModal from '@/Pages/Users/Partials/CreateUserModal';
import UserCard from '@/Pages/Users/Partials/UserCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { usePage } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';

export default function Index({ employees }) {
    const authUser = usePage().props.auth.user;
    return (
        <AuthenticatedLayout  header={"Employees "}>
            <div className='container mx-auto px-4'>
                <div className="flex flex-col md:flex-row justify-between items-center py-4 mb-6 border-b">
                    <h1 className="text-3xl font-semibold text-gray-800">Employees</h1>
                    <CreateUserModal role={"employee"} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {employees.data.length === 0 ? (
                        <div className="col-span-full text-center text-gray-500">No employees found</div>
                    ) : (
                        employees.data.map(employee => (
                            <UserCard key={employee.id} user={employee} role={authUser?.role} />
                        ))
                    )}
                </div>
                <Pagination className="relative my-2 rounded-lg"  data={employees}/>
            </div>
        </AuthenticatedLayout>
    );
}

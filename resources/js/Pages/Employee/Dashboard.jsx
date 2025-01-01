import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
        <Head title="Employees" />
        <div className='container mx-auto px-4'>
            <div className="flex flex-col md:flex-row justify-between items-center py-4 mb-6 border-b">
                <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
            </div>
           
        </div>
    </AuthenticatedLayout>
    );
}

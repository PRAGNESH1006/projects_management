import React from 'react';
import { Link } from '@inertiajs/react';

export default function DashboardCard({ title, count, icon, color, createRoute, viewRoute }) {
    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6">
                <div className="flex items-center">
                    <div className={`flex-shrink-0 rounded-md p-3 ${color}`}>
                        <span className="text-2xl">{icon}</span>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                        <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
                            <dd className="text-3xl font-semibold text-gray-900">{count}</dd>
                        </dl>
                    </div>
                </div>
                <div className="mt-6">
                    <div className="flex items-center justify-between">
                        <Link href={route(createRoute, { role: title.toLowerCase() })} className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                            Create
                        </Link>
                        <Link href={route(viewRoute)} className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                            View all
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}


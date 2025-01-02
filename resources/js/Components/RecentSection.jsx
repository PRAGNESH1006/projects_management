import React from 'react';
import { Link } from '@inertiajs/react';

export default function RecentSection({ title, items, viewAllRoute }) {
    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
                    <Link href={route(viewAllRoute)} className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        View all
                    </Link>
                </div>
                {items.length === 0 ? (
                    <p className="text-gray-500">No recent items found</p>
                ) : (
                    <div className="max-h-[20rem] overflow-y-auto scrollbar-none">
                        <ul className="divide-y divide-gray-200">
                            {items.map((item) => (
                                <li key={item.id} className="py-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            {item?.name ? (<span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                                <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                </svg>
                                            </span>) : ("📊")}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                {item.name || item.title}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate">
                                                {item.email || item.description || `Status: ${item.status}`}
                                            </p>
                                        </div>
                                        <p className="text-xs text-gray-500 truncate">
                                            { `Updated: ${new Date(item.updated_at).toLocaleString()} ` }
                                        </p>
                                        {/* <Link href={route(`${item.name || item.title}.show`, item.id)}>Show</Link> */}
                                        {/* <span>{item.created_by}</span> */}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

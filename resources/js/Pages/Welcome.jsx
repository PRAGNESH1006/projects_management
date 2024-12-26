import { Head, Link } from '@inertiajs/react';
import React from 'react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />

            <nav className="flex justify-end bg-gray-500 p-4">
                <div className="container mx-auto">
                    <span className="text-2xl font-bold text-white hover:text-blue-300 cursor-pointer transition duration-150 ease-in-out">
                        Inertia.js
                    </span>
                </div>
                {auth.user ? (
                    <Link
                        href={route(`${auth?.user.role}.dashboard`)}
                        className="text-white text-center px-4 py-2 hover:bg-gray-700 rounded transition duration-300 ease-in-out"
                    >
                        Dashboard
                    </Link>
                ) : (
                        <Link
                            href={route('login')}
                            className="text-white text-center px-4 py-2 hover:bg-gray-700 rounded transition duration-300 ease-in-out"
                        >
                            Log in
                        </Link>
                )}
            </nav>

            <div className="flex flex-col items-center justify-center min-h-[89vh] bg-gray-100 p-4">
                <Head title="Welcome" />
                <h1 className="text-4xl font-bold text-gray-800">Welcome to Inertia.js</h1>
                <p className="text-lg mt-4 text-gray-600">
                    An app template for Laravel and React.js
                </p>
            </div>
        </>
    );
}

import { Head, Link } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import { FaUserCircle } from 'react-icons/fa';
import React from 'react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome to Project Manager" />

            <nav className="flex justify-between items-center bg-white p-4 fixed w-full top-0 z-50 shadow-lg border-b border-gray-200">
                <div className="text-2xl font-bold text-gray-900 ml-6 cursor-pointer hover:text-blue-600 transition duration-200">
                    Project Manager
                </div>

                <div className="flex space-x-4 mr-6 text-sm">
                    {auth.user ? (
                        <>
                            <Dropdown className="text-sm">
                                <Dropdown.Trigger>
                                    <div className="flex items-center space-x-2 cursor-pointer">
                                        <span className="text-gray-900">{auth.user.name}</span> <svg
                                            className="-me-0.5 ms-2 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </Dropdown.Trigger>

                                <Dropdown.Content align="right">
                                    <Dropdown.Link href={route(`${auth?.user?.role}.dashboard`)}>Dashboard</Dropdown.Link>
                                    <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">Logout</Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </>
                    ) : (
                        <Link
                            href={route('login')}
                            className="text-gray-900 px-4 py-2 hover:bg-gray-200 rounded transition duration-300 ease-in-out"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </nav>

            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-300 text-gray-900 p-6 space-y-6">
                <h1 className="text-5xl font-bold mb-4 animate__animated animate__fadeIn">
                    Welcome to Project Manager
                </h1>
                <p className="text-xl mb-6 animate__animated animate__fadeIn animate__delay-1s">
                    Manage your projects, tasks, and teams with ease and efficiency.
                </p>

                {auth.user ? (
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold">Hello, {auth.user.name}!</h2>
                        <p className="text-lg mt-2">You're all set to manage your projects.</p>
                        <div className="mt-6">
                            <Link
                                href={route(`${auth?.user?.role}.dashboard`)}
                                className="text-white bg-indigo-600 px-6 py-3 rounded-full hover:bg-indigo-700 transition-all duration-300 ease-in-out"
                            >
                                Go to Dashboard
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold">Welcome, Guest!</h2>
                        <p className="text-lg mt-2">Please log in to manage your projects.</p>
                        <div className="mt-6">
                            <Link
                                href={route('login')}
                                className="text-white bg-indigo-600 px-6 py-3 rounded-full hover:bg-indigo-700 transition-all duration-300 ease-in-out"
                            >
                                Login to Continue
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

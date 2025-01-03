import { Head, Link } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import React from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome to Project Manager" />
            <nav className="border-b border-gray-100 bg-white sticky top-0 z-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/" className='flex items-center'>
                                    <ApplicationLogo className="block   h-9 w-auto fill-current text-gray-800" /> <span className='font-bold text-gray-900 text-xl ursor-pointer hover:text-blue-600 transition duration-200'>Project Manager</span>
                                </Link>
                            </div>
                        </div>
                        <div className="sm:ms-6 sm:flex sm:items-center mr-3 ">
                            <div className="relative ms-3 text-sm">
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
                        </div>
                    </div>
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

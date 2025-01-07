import ProjectCard from './Partials/ProjectCard'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Link, usePage, useForm } from '@inertiajs/react'
import { FaSearch } from "react-icons/fa";
import React from 'react'
import Pagination from '@/Components/Pagination';

export default function Index({ projects }) {
    const authUser = usePage().props.auth.user;
    const { data, setData, get } = useForm({ q: '' });

    const handleSearch = (e) => {
        e.preventDefault();
        get(route('projects.search'), { preserveState: true });
    };

    return (
        <AuthenticatedLayout header={"Projects"}>
            <div className='container mx-auto px-4'>
                <div className="flex flex-col md:flex-row justify-between items-center py-4 mb-6 border-b">
                      <Link href={authUser?.role==='admin'?route('projects.index'):route(`${authUser?.role}.projects`, authUser?.id)} className="text-3xl font-semibold text-gray-800">Projects</Link>
                    <div className="flex space-x-2 items-center">
                        <form onSubmit={handleSearch} className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={data.q}
                                onChange={(e) => setData('q', e.target.value)}
                                placeholder="Search tasks..."
                                className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            />
                            <button
                                type="submit"
                                className="px-4 py-3 bg-gray-500 hover:bg-slate-600 text-white text-md font-medium rounded-md transition-colors duration-300"
                            >
                                <FaSearch />
                            </button>
                        </form>
                        {authUser?.role === 'admin' && <Link href={route(`projects.create`)} className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded-md transition-colors duration-300">
                            Create New Projects
                        </Link>}
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {projects.data.length === 0 ? (
                        <div className="col-span-full text-center text-gray-500">No projects found</div>
                    ) : (
                        projects.data.map(project => (
                            <ProjectCard key={project.id} project={project} role={authUser?.role} />
                        ))
                    )}
                </div>
                <Pagination className="relative my-2 rounded-lg" data={projects} />
            </div>
        </AuthenticatedLayout>
    )
}

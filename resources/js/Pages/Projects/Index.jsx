import ProjectCard from './Partials/ProjectCard'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, usePage } from '@inertiajs/react'
import React from 'react'

export default function Index({ projects }) {
    const authUser = usePage().props.auth.user;
    return (
        <AuthenticatedLayout header={"Projects"}>
            <div className='container mx-auto px-4'>
                <div className="flex flex-col md:flex-row justify-between items-center py-4 mb-6 border-b">
                    <h1 className="text-3xl font-semibold text-gray-800">Projects</h1>
                    <Link href={route(`projects.create`)} className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded-md transition-colors duration-300">
                        Create New Projects
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {projects.length === 0 ? (
                        <div className="col-span-full text-center text-gray-500">No projects found</div>
                    ) : (
                        projects.map(project => (
                            <ProjectCard key={project.id} project={project} role={authUser?.role} />
                        ))
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

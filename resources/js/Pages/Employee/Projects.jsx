import ProjectCard from '@/Components/ProjectCard'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head,usePage } from '@inertiajs/react'
import React from 'react'

export default function Projects({ projects }) {
    const user = usePage().props.auth.user;
    return (
        <AuthenticatedLayout>
            <Head title="Projects" />
            <div className='container mx-auto px-4'>
                <div className="flex flex-col md:flex-row justify-between items-center py-4 mb-6 border-b">
                    <h1 className="text-3xl font-semibold text-gray-800">Projects</h1>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {projects.length === 0 ? (
                        <div className="col-span-full text-center text-gray-500">No projects found</div>
                    ) : (
                        projects.map(project => (
                            <ProjectCard key={project.id} project={project} role={user?.role} />
                        ))
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

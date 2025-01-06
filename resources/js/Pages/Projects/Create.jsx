import React from 'react';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProjectForm from './Partials/ProjectForm';

export default function Create({ clients, employees }) {

  return (
    <AuthenticatedLayout header={"Create Project"}>
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Create New Project</h1>
          <Link
            href={route('projects.index')}
            className="mt-4 md:mt-0 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Back to Projects
          </Link>
        </div>

        <ProjectForm 
          clients={clients} 
          employees={employees} 
        />
      </div>
    </AuthenticatedLayout>
  );
}

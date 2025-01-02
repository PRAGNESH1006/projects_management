import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react';

function Edit({ user }) {
  return (
   <AuthenticatedLayout>
    <Head title="User Edit" />
    <div>
    <p>{user.name}</p>
    <p>{user.email}</p>
    </div>
   </AuthenticatedLayout>
  );
}

export default Edit;

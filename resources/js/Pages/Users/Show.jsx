import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

function Show({user}) {
  return (
   <AuthenticatedLayout>
    <Head title="User Details" />
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
   </AuthenticatedLayout>
  )
}

export default Show
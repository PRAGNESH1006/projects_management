import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

export default function Show({task}) {
  return (
   <AuthenticatedLayout>
    <Head title="Task Details" />
    <div>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
    </div>
   </AuthenticatedLayout>
  )
}

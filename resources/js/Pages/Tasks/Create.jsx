import React from 'react'
import TaskForm from './Partials/TaskForm';

export default function Create({ employees, projects }) {

    return (
        <TaskForm employees={employees} projects={projects} />
    );
}


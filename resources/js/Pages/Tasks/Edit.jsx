import TaskForm from './Partials/TaskForm';

function Edit({ task, statuses, employees, project }) {
  return (
    <TaskForm employees={employees} project={project} statuses={statuses} task={task} />
  );
}

export default Edit;

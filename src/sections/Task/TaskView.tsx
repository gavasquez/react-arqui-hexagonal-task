import { useState } from 'react';
import { createTaskService } from '../../lib/Task/application/TaskService';
import { createLocalStorageTaskRepository } from '../../lib/Task/infrastructure/LocalStorageTaskRepository';

const repository = createLocalStorageTaskRepository();
const service = createTaskService(repository);

export default function TaskView() {

  const [tasks, setTasks] = useState([])

  return (
    <div>
      <h1>Task View</h1>
    </div>
  )
}
import { FormEventHandler, useEffect, useState } from 'react';
import { createTaskService } from '../../lib/Task/application/TaskService';
import { createLocalStorageTaskRepository } from '../../lib/Task/infrastructure/LocalStorageTaskRepository';
import { generateTaskId, isValidTaskTitle, Task } from '../../lib/Task/domain/Task';

const repository = createLocalStorageTaskRepository();
const service = createTaskService( repository );

export default function TaskView() {

  const [ tasks, setTasks ] = useState<Task[]>( [] );

  const [ title, settitle ] = useState( '' );

  const [ formErrors, setFormErrors ] = useState<{ title: null | string; }>( { title: null } );


  const onSubmit: FormEventHandler = ( e ) => {
    e.preventDefault();
    const isValid = isValidTaskTitle( title );
    setFormErrors( ( prev ) => ( { ...prev, title: isValid ? null : "Invalid title" } ) );
    if ( !isValid ) return;

    service.save( { id: generateTaskId(), title } )
      .then( () => {
        fecthTasks();
        settitle( '' );
      } )
      .catch( error => {
        alert( error.message );
      } );
  };

  const fecthTasks = () => {
    service.getAll().then( ( tasks: Task[] ) => {
      setTasks( tasks );
    } ).catch( ( error ) => {
      alert( error.message );
    } );
  };


  useEffect( () => {
    fecthTasks();
  }, [] );

  useEffect( () => {
    setFormErrors( ( prev ) => ( { ...prev, title: null } ) );
  }, [ title ] );



  return (
    <div>
      <h1>Task View</h1>
      {
        tasks.length === 0 && <p>No tasks</p>
      }
      <ul>
        {
          tasks.map( ( task, index ) => (
            <li key={ index }>
              <div style={ { display: 'flex' } }>
                <button onClick={ () => {
                  service.save( { id: task.id, title: task.title, isDone: !task.isDone } )
                    .then( () => {
                      fecthTasks();
                    } );
                } }>
                  {
                    task.isDone ? '🟢' : '⚪'
                  }
                </button>
                <p>{ task.isDone ? <s>{ task.title }</s> : task.title }</p>
                <button onClick={ () => service.delete( task.id ).then( () => fecthTasks() ) }>🗑</button>
              </div>
            </li>
          ) )
        }
      </ul>

      <form onSubmit={ onSubmit }>
        <input type="text" placeholder="Task title" value={ title } onChange={ e => settitle( e.target.value ) } />
        <button type="submit">Add Task</button>
      </form>
      {
        formErrors.title !== null && <p>{ formErrors.title }</p>
      }
    </div>
  );
}
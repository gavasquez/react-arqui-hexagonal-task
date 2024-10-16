import { ensureTaskIdIsValid, ensureTaskTitleIsValid } from '../domain/Task';
import { TaskRepository } from '../domain/TaskRepository';


export const createTaskService = (repository: TaskRepository) => {

  return {
    getAll: async () => repository.getAll(),
    save: async ({id, title, isDone}: {id: string, title: string, isDone?: boolean}) => {
      ensureTaskIdIsValid(id);
      ensureTaskTitleIsValid(title);
      await repository.save({id, title, isDone: isDone ? isDone : false, createAt: new Date()});
    },
    delete: async (id: string) => {
      ensureTaskIdIsValid(id);
      await repository.delete(id);
    }
  }
}
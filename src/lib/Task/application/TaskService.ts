import { ensureTaskIdIsValid } from '../domain/Task';
import { TaskRepository } from '../domain/TaskRepository';


export const createTaskService = (repository: TaskRepository) => {

  return {
    getAll: () => repository.getAll(),
    save: (id: string, title: string, isDone: boolean) => {
      ensureTaskIdIsValid(id);
      repository.save({id, title, isDone, createAt: new Date()});
    },
    delete: (id: string) => {
      ensureTaskIdIsValid(id);
      repository.delete(id);
    }
  }
}
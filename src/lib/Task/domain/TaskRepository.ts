import { Task } from './Task';


export interface TaskRepository {
  getAll(): Task[];
  save(task: Task): void;
  delete(id: string): void;
}
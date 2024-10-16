import { v4, validate } from "uuid";

export interface Task {
  id: string;
  title: string;
  isDone: boolean;
  createAt: Date;
}

export const generateTaskId = () => v4();

export function isValidTaskId(id: string): boolean {
  return validate(id);
}

export function ensureTaskIdIsValid(id: string){
  if(!isValidTaskId(id)) {
    throw new Error('Invalid task id');
  }
}

export function isValidTaskTitle(title: string) {
  return title.length > 0;
}

export function ensureTaskTitleIsValid(title: string): void {
  if(!isValidTaskTitle(title)) {
    throw new Error('Invalid task title');
  }
}
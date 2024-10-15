import { validate } from "uuid";

export interface Task {
  id: string;
  title: string;
  isDone: boolean;
  createAt: Date;
}

export function isValidTaskId(id: string): boolean {
  return validate(id);
}

export function ensureTaskIdIsValid(id: string){
  if(!isValidTaskId(id)) {
    throw new Error('Invalid task id');
  }
}
import { Task } from 'src/app/views/tasks/task.model';
import { Tio } from 'src/app/commons/models/tio'
export interface AppState {
  readonly tasks: Task[];
  readonly tios: Tio[];
  readonly login: Tio[];
}
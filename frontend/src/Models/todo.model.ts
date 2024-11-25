import {TodoDTO} from '../app/interfaces/todo-dto';

export class TodoModel {
  id: number;
  title: string;

  constructor(dto: TodoDTO) {
    this.id = dto.id || -1;
    this.title = dto.title || '';
  }
}

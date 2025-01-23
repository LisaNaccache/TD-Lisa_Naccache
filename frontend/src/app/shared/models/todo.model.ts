import {TodoDto} from '../interfaces/todo-dto';

export class TodoModel {
  id: number;
  title: string;

  constructor(dto: TodoDto) {
    this.id = dto.id || -1;
    this.title = dto.title || '';
  }
}

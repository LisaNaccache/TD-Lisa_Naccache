import {Component, inject} from '@angular/core';
import {TodoService} from '../todo.service';
import {NgForOf} from '@angular/common';
import {TodoDTO} from '../interfaces/todo-dto';

@Component({
  selector: 'app-todo-list-page',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './todo-list-page.component.html',
  styleUrl: './todo-list-page.component.css'
})
export class TodoListPageComponent {

  readonly todoService = inject(TodoService);
  todos: TodoDTO[] = [];

  onClickReload() {
    this.todoService.getAllTodoDTOs().subscribe({
      next: data => {
        console.log('finished loaded Todos, saving to component field');
        this.todos = data;
        console.log(this.todos);
      }, error: err => {
        console.log('Failed to load Todos from Http server', err);
      }
    })
  }
}

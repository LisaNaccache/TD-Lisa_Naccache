import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {TodoDTO} from './interfaces/todo-dto';

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  private readonly apiBaseUrl = 'http://localhost:3000/api';

  constructor(private readonly httpClient: HttpClient) {}

  getAllTodoDTOs(): Observable<TodoDTO[]> {
    return this.httpClient.get<TodoDTO[]>(`${this.apiBaseUrl}/todos`);
  }

  /*addTodoDTO(todo: TodoDTO): Observable<TodoDTO> {
    return this.httpClient.post<TodoDTO>(${this.apiBaseUrl}/todos`, todo);
  }

  updateTodoDTO(todo: TodoDTO): Observable<TodoDTO> {
    return this.httpClient.put<TodoDTO>(`${this.apiBaseUrl}/${todo.id}`, todo);
  }*/
}

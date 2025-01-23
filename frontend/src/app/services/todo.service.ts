import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {TodoDto} from '../shared/interfaces/todo-dto';
import {TodoModel} from '../shared/models/todo.model';
import {DefaultService} from '../../generated/angular-client';

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  private readonly apiBaseUrl = 'http://localhost:3000/api';

  //private readonly httpClient = inject(HttpClient);

  private readonly todoApiService = inject(DefaultService);

  constructor(private readonly httpClient: HttpClient) {
  }

  //V1
  getAllTodoDtos(): Observable<TodoDto[]> {
    return this.httpClient.get<TodoDto[]>(`${this.apiBaseUrl}/todos`)
      .pipe(map(src => src.map(x => new TodoModel(x))));
  }

  //V2
  toDTOs(todoArray: TodoDto[]): TodoModel[] {
    return todoArray.map(dto => new TodoModel(dto));
  }

  getTodos(): Observable<TodoModel[]> {
    return this.todoApiService.apiTodosGet().pipe(
      map((todoArray: TodoDto[]) => this.toDTOs(todoArray))
    );
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {TodoDTO} from './interfaces/todo-dto';
import {TodoModel} from '../Models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  private readonly apiBaseUrl = 'http://localhost:3000/api';

  constructor(private readonly httpClient: HttpClient) {
  }

  /*
     pipe : sert a transformer ou manipuler les donnees d'un observable
     map : permet de prendre chaque element dans l observable et la modifier
     x => new TodoModel(x) : fonction anonyme transforme chaque élément x (de type TodoDTO) du tableau en un nouvel objet TodoModel
     Convertir des données brutes (TodoDTO[]) en un format plus utile (TodoModel[]).
   */
  getAllTodoDTOs(): Observable<TodoDTO[]> {
    return this.httpClient.get<TodoDTO[]>(`${this.apiBaseUrl}/todos`)
      .pipe(map(src => src.map(x => new TodoModel(x))));
  }

  /*addTodoDTO(todo: TodoDTO): Observable<TodoDTO> {
    return this.httpClient.post<TodoDTO>(${this.apiBaseUrl}/todos`, todo);
  }

  updateTodoDTO(todo: TodoDTO): Observable<TodoDTO> {
    return this.httpClient.put<TodoDTO>(`${this.apiBaseUrl}/${todo.id}`, todo);
  }*/
}

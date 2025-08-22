import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface Task{
  id:number;
  title:string;
  completed:boolean;
  projectId:number;
}

type JsonTodo = {
  userId:number;
  id:number;
  title:string;
  completed:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private readonly API = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http:HttpClient) { }

  getTasksByProjectId(projectId: number): Observable<Task[]> {
    return this.http.get<JsonTodo[]>(`${this.API}?userId=${projectId}`)
      .pipe(
        map(todos => todos.map(t =>({
          id:t.id,
          title:t.title,
          completed:t.completed,
          projectId: t.userId
        })))
      );
  }
}

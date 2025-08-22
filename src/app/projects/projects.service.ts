import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

export interface Project{
  id:number;
  title:string;
  description:string;
  owner?:string;
}

interface JsonPlaceHolderUser{
  id:number;
  name:string;
  username:string;
  email:string;
  website:string;
  company?:{
    name:string;
    catchPhrase:string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private readonly API = ' https://jsonplaceholder.typicode.com/users';
  
  constructor(private http:HttpClient) { }

  getProjects(): Observable<Project[]>{
    return this.http.get<JsonPlaceHolderUser[]>(this.API).pipe(
      map(users =>
        users.map(u => ({
          id:u.id,
          title:u.name,
          description: u.company?.name || 'Sitio: ${u.website}',
          owner: u.username
        })),
      ),
    shareReplay(1)
    );
  }
}

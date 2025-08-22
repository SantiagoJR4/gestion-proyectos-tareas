import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Project } from './projects.service';

const STORAGE_KEY = 'app_projects_v1';

@Injectable({
  providedIn: 'root'
})
export class ProjectsStoreService {

  private _projects$ = new BehaviorSubject<Project[]>(this.load());
  public projects$ = this._projects$.asObservable();

  private load(): Project[]{
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      if(!raw) {return[]}
      return JSON.parse(raw) as Project[];
    } catch{
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }
  }

  private save(items:Project[]){
    try{
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e){
      console.warn('No se pudo escribir en el localstorage', e)
    }
    this._projects$.next([...items])
  }

  getAll() : Project[]{
    return [...this._projects$.value];
  }

  add(project:Project){
    const items = this.getAll();
    items.push(project);
    this.save(items);
  }

  update(id:number, patch: Partial<Project>){
    const items = this.getAll();
    const updatedItems = items.map(project =>{
      if(project.id === id){
        return {...project, ...patch};
      }
      return project;
    })
    this.save(updatedItems);
  }

  remove(id:number){
    const items = this.getAll().filter(project => project.id !== id);
    this.save(items);
  }

  setAll(items:Project[]){
    this.save(items);
  }
  
}

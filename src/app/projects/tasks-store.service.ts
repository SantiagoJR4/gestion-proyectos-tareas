import { Injectable } from '@angular/core';
import { Task } from './tasks.service';
import { BehaviorSubject } from 'rxjs';

const TASKS_KEY = 'app_tasks_v1';

@Injectable({
  providedIn: 'root'
})
export class TasksStoreService {

  private _tasks$ = new BehaviorSubject<Task[]>(this.load());
  tasks$ = this._tasks$.asObservable();

  private load(): Task[]{
    try {
      const raw = localStorage.getItem(TASKS_KEY);
      if (!raw) { return []; }
      return JSON.parse(raw) as Task[];
    } catch {
      localStorage.removeItem(TASKS_KEY);
      return [];
    }
  }

  private save(items: Task[]){
    try{
      localStorage.setItem(TASKS_KEY, JSON.stringify(items));
    } catch{
      this._tasks$.next(items)
    }
  }

  getAll() : Task[]{
      return [...this._tasks$.value];
  }
  
  add(task:Task){
    const items = this.getAll();
    items.push(task);
    this.save(items);
  }

  update(id:number, patch: Partial<Task>){
    const items = this.getAll();
    const updatedItems = items.map(task =>{
      if(task.id === id){
        return {...task, ...patch};
      }
      return task;
    })
    this.save(updatedItems);
  }

  remove(id:number){
    const items = this.getAll().filter(task => task.id !== id);
    this.save(items);
  }

  setAll(items:Task[]){
    this.save(items);
  }

}

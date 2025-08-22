import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task, TasksService } from '../tasks.service';
import { ButtonDirective } from "primeng/button";
import { CommonModule, NgIf } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CardModule } from 'primeng/card';
import { ConfirmationService } from 'primeng/api';
import { TasksStoreService } from '../tasks-store.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TaskFormComponent } from "../task-form/task-form.component";

@Component({
  selector: 'app-project-tasks',
  standalone: true,
  imports: [ButtonDirective, NgIf, ConfirmDialogModule, CommonModule, ProgressSpinnerModule, CardModule, TaskFormComponent],
  providers: [ConfirmationService],
  templateUrl: './project-tasks.component.html',
  styleUrl: './project-tasks.component.css'
})
export class ProjectTasksComponent implements OnInit{
  projectId!:number;
  tasks: Task[] = [];
  loading = true;
  error: string | null = null;

  showForm = false;
  editing: Task | null = null;

  constructor(
    private route:ActivatedRoute,
    private router: Router,
    private tasksService: TasksService,
    private store:TasksStoreService,
    private confirm: ConfirmationService
  ){}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.projectId = id;
    if(!this.projectId){
      this.error = 'ID de proyecto no válido';
      this.loading = false;
      return;
    }

    this.tasksService.getTasksByProjectId(this.projectId).subscribe({
      next: remote => {
        const local = this.store.getAll().filter(t => t.projectId === id);
        const merged = [
          ...remote.filter(r => !local.some(l => l.id === r.id)),
          ...local
        ]
        this.tasks = merged;
        this.loading = false;
      },
      error: () => {
        this.tasks = this.store.getAll().filter(t => t.projectId === id);
        this.loading = false;
        if(!this.tasks.length){
          this.error = 'No se pudieron cargar las tareas del proyecto';
        }
      }
    });  
  }

  statusLabel(task:Task):string{
    return task.completed ? 'Completada' : 'No completada';
  }

  openCreate(){
    this.editing = null;
    this.showForm = true;
  }

  openEdit(task:Task){
    this.editing = task;
    this.showForm = true;
  }

  onSaveTask(task: Task): void {
    if(!task.id){
      task.id = Date.now();
      task.projectId = this.projectId;
      this.store.add(task);
      this.tasks = [...this.tasks, task];
    }else{
      this.store.update(task.id,task);
      this.tasks = this.tasks.map(t => t.id === task.id ? task : t);
    }
  }

  confirmDelete(task: Task){
    this.confirm.confirm({
      message: '¿Estás seguro de que deseas eliminar esta tarea?',
      header: 'Confirmar eliminación',
      accept: () =>{
        this.store.remove(task.id);
        this.tasks = this.tasks.filter(t => t.id !== task.id);
      }
    });
  }

  goHome(): void{
    this.router.navigate(['/projects']);
  }
  
}

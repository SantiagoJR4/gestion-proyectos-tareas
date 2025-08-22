import { Component, OnInit } from '@angular/core';
import { Project, ProjectsService } from '../projects.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ProjectsStoreService } from '../projects-store.service';
import { ProjectDraft, ProjectFormComponent } from '../project-form/project-form.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [NgIf, CommonModule, ConfirmDialogModule, RouterModule, ProgressSpinnerModule, CardModule, ButtonModule, ProjectFormComponent],
  providers: [ConfirmationService, MessageService],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent implements OnInit{
  projects : Project[] = [];
  loading = true;
  error: string | null = null;

  formVisible = false;
  editing: Project | null = null;

  constructor(private projectsService: ProjectsService,
    private router:Router,
    private store: ProjectsStoreService,
    private confirmation: ConfirmationService
  ){}

  ngOnInit(): void {
    this.store.projects$.subscribe(list => {
      this.projects = list
    });
    this.projectsService.getProjects().subscribe({
      next:remote =>{
        const local = this.store.getAll();
        if(!local || local.length === 0){
          const seeded = remote.map(r => ({
            id:r.id,
            title: r.title,
            description: r.description,
            owner: r.owner
          }))
          this.store.setAll(seeded);
          this.projects = seeded;
        }else{
          this.projects = local;
        }
        this.loading = false;
      },
      error: (err) => {
        this.projects = this.store.getAll();
        this.loading = false;
        if(!this.projects.length){
          this.error = 'No se pudo cargar la lista de proyectos';
        }
      }
    });
  }
  goToTasks(projectId: number): void{
    this.router.navigate(['/projects', projectId, 'tasks']);
  }

  openCreate():void{
    this.editing = null;
    this.formVisible = true;
  }

  openEdit(p:Project): void{
    this.editing = p;
    this.formVisible = true;
  }

  onSaveProject(value:ProjectDraft):void{
    if(!value.id){
      const newId = Date.now();
      const newProject: Project = {
        id: newId,
        title: value.title,
        description: value.description || '',
        owner: value.owner || ''
      };
      this.store.add(newProject);
    }else{
      this.store.update(value.id, {
        title: value.title,
        description: value.description,
        owner: value.owner
      });
    }
    this.formVisible = false;
  }

  confirmDelete(p: Project): void{
    this.confirmation.confirm({
      message: `¿Está seguro de eliminar el proyecto "${p.title}"?`,
      accept: () => {
        this.store.remove(p.id);
      }
    });
  }

}

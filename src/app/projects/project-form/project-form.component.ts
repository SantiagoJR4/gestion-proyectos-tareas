import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../projects.service';
import { FormBuilder,FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from "primeng/inputtext";
import { CommonModule, NgIf } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

export interface ProjectDraft{
  id?: number | null;
  title: string;
  description?:string;
  owner?:string;
}

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [DialogModule, ConfirmDialogModule ,FormsModule, ReactiveFormsModule, InputTextModule, CommonModule, NgIf],
  providers:[ConfirmationService, MessageService],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css'
})
export class ProjectFormComponent {
  @Input() visible = false;
  @Input() initial: Project | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Project>();
  
  form:FormGroup;

  constructor(private fb:FormBuilder){
    this.form = this.fb.group({
      id: [null],
      title:['',[Validators.required]],
      description: [''],
      owner:['']
    });
  }

  ngOnChanges(){
    if (this.initial) {
      this.form.patchValue(this.initial);
    } else {
      this.form.reset({id: null, title: '', description: '', owner: ''});
    }
  }

  onSave(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.value as Project;
    this.save.emit(value);
    this.close.emit();
  }

  onClose(){
    this.close.emit();
  }


}

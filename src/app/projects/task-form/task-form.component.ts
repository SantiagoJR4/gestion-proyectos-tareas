import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../tasks.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { CommonModule, NgIf } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [DialogModule, ConfirmDialogModule ,FormsModule, ReactiveFormsModule, CommonModule, NgIf, CheckboxModule],
  providers:[ConfirmationService, MessageService],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {

  @Input() visible = false;
  @Input() initial: Task | null = null;
  @Input() projectId!: number;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Task>();
  
  form:FormGroup;

  constructor(private fb:FormBuilder){
    this.form = this.fb.group({
      id: [null],
      title:['',[Validators.required]],
      completed: [false],
      projectId:[null]
    });
  }

  ngOnChanges(){
    if (this.initial) {
      this.form.patchValue(this.initial);
    } else {
      this.form.reset({id: null, title: '', completed:false, projectId:null});
    }
  }

  onSave(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.value as Task;
    this.save.emit(value);
    this.close.emit();
  }

  onClose(){
    this.close.emit();
  }
  
}

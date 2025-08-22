import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-error-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class = "error-dialog">
      <div class="error-body">
        <h3 class="error-title">{{title}}</h3>
        <p class="error-message" *ngIf="message">{{message}}</p>
        <pre *ngIf="detail" class="error-detail">{{detail}}</pre>
      </div>
      <div class="error-actions" style="text-align:right; margin-top: 1rem;">
        <button pButton type="button" label="Cerrar" class="p-button-text" (click)="close()"></button>
      </div>
    </div>
  `,
  styles: [`
    .error-title {
      margin: 0 0 6px 0;
      font-size: 1.05rem;
      color: #c62828;
    }
    .error-message {
      margin:0;
      color: #333;
    }
    .error-detail {
      margin-top:8px;
      background: #f7f7f7;
      padding: 8px;
      border-radius: 6px;
      font-size:0.9rem;
      color:#333;
    }
  `]
})
export class ErrorDialogComponent {
  title = 'Error';
  message:string | null = null;
  detail:string | null = null;

  constructor(public ref:DynamicDialogRef, public config:DynamicDialogConfig) {
    const data = config?.data ?? {};
    this.title = data.title || this.title;
    this.message = data.message || null;
    this.detail = data.detail || null;
  }

  close(){
    this.ref.close();
  }

}

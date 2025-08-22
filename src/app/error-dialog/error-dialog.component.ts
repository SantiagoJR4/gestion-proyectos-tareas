import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ErrorDialogPayload, ErrorDialogService } from '../error-dialog.service';
import { Subscription } from 'rxjs';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-error-dialog',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule],
  template: `
    <p-dialog
      header = "{{payload?.title || 'Error'}}"
      [(visible)]="visible"
      [modal]="true"
      [closable]="true"
      [style]="{width:'520px'}"
      (onHide)="close()"
      >

      <div *ngIf="payload">
        <p style="margin:0 0.5rem 0.5rem 0;"></p>
        {{payload.message}}
      </div>

      <pre *ngIf="payload?.detail" style="background: #f7f7f7; padding:0.6rem; border-radius:6px;">
        {{payload?.detail}}
      </pre>

      <ng-template pTemplate="footer">
        <button pButton type="button" label="Cerrar" (click)="close()"></button>
      </ng-template>
      
    </p-dialog>
  `,
  styles: [`
    :host{display:block;}
  `]
})
export class ErrorDialogComponent {
  visible = false;
  payload : ErrorDialogPayload | null = null;
  private sub: Subscription;

  constructor(private svc: ErrorDialogService) {
    this.sub = this.svc.dialog$.subscribe(p => {
      this.payload = p;
      this.visible = !!p;
    })
  }

  close(){
    this.visible = false;
    setTimeout(() => this.svc.close(), 200);
  }

  ngOnDestroy() : void{
    this.sub.unsubscribe();
  }

}

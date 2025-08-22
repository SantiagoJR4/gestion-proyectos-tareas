import { Injectable } from '@angular/core';
import { DialogService, DynamicDialogConfig} from 'primeng/dynamicdialog';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorDialogService {

  constructor(private dialog: DialogService) { }

  open(title: string, message: string , detail?: string) {
    try{
      const config : DynamicDialogConfig = {
      header: title,
      data: { title, message, detail },
      closable: true,
      width: '480px',
      baseZIndex: 10000
    };
      this.dialog.open(ErrorDialogComponent as any, config);
    } catch(e){
      console.error('ErrorDialogService.open', e);
      alert('Error al abrir el diálogo de error. Por favor, inténtelo de nuevo más tarde.');
    }
  }
}

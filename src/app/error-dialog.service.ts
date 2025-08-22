import { Injectable } from '@angular/core';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { BehaviorSubject } from 'rxjs';

export interface ErrorDialogPayload{
  title:string;
  message:string;
  detail?: string | null;
}

@Injectable({
  providedIn: 'root'
})

export class ErrorDialogService {

  private _dialog$ = new BehaviorSubject<ErrorDialogPayload | null>(null);
  dialog$ = this._dialog$.asObservable();

  constructor() { }

  open(title: string, message: string , detail?: string) {
    try{
      this._dialog$.next({
      title, message, detail:detail ?? null
    });
    } catch(e){
      console.error('ErrorDialogService.open', e);
      alert('Error al abrir el diálogo de error. Por favor, inténtelo de nuevo más tarde.');
    }
  }

  close(){
    this._dialog$.next(null);
  }
}

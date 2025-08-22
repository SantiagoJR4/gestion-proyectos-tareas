import { HttpInterceptorFn } from '@angular/common/http';
import { ErrorDialogService } from './error-dialog.service';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorDialog = inject(ErrorDialogService);

  return next(req).pipe(
    catchError((err:any) => {
      let status = err?.status ?? 0;
      let message = 'Ocurrio un error inesperado. Intente nuevamente.';
      if(status === 0){
        message = 'No se pudo conectar con el servidor. Revisa tu conexión';
      }else if(status >= 500){
        message = 'Error en el servidor. Intenta más tarde.';
      }else if(err?.error.message){
        message = err.error.message
      }else if(err.message){
        message = err.message;
      }else{
        message = `Error ${status}`;
      }

      let detail: string | undefined;
      try {detail = JSON.stringify(err.error ?? err, null, 2);} catch{detail = undefined};

      errorDialog.open(`Error ${status}`, message , detail);
      
      return throwError(() => 'e');
    })
  );
};

import { HttpInterceptorFn } from '@angular/common/http';
import { ErrorDialogService } from './error-dialog.service';
import { inject } from '@angular/core';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const dialogService = inject(ErrorDialogService);

  /*
  return next(req).pipe(
    catchError((error) => {
      dialogService.open(ErrorDialogComponent,{
        header:'Error en la petición',
        width:'400px',
        data:{
          status: error.status,
          message: error.message,
        }
      });

      return throwError(() => error);
    })
  )
  */
  return throwError(() => 'e');
};

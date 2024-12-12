// import { HttpInterceptorFn } from '@angular/common/http';
// import { HttpErrorResponse } from '@angular/common/http';
// import { throwError } from 'rxjs';
// import { catchError, tap } from 'rxjs/operators';
// import {MensajeService} from '../paginas/mensaje/mensaje.component';
// import { inject } from '@angular/core';

// export const emptyFieldsInterceptor: HttpInterceptorFn = (req, next) => {
//   const mensajeService = inject(MensajeService);
//   // Solo interceptar solicitudes POST o PUT
//   if (req.method === 'POST' || req.method === 'PUT'  || req.method === 'PATCH') {
//     const body = req.body;

//     if (body && typeof body === 'object') {
//       const emptyFields = getEmptyFields(body);

//       if (emptyFields.length > 0) {
//         // mensajeService.mostrarMensajeError(
//         //   'Error de Validación',
//         //   `Los siguientes campos están vacíos: ${emptyFields.join(', ')}`
//         // );
//         const errorResponse = new HttpErrorResponse({
//           status: 400,
//           statusText: 'Bad Request',
//           error: {
//             message:`Los siguientes campos están vacíos: ${emptyFields.join(', ')}`,
//           },
//         });

//         return throwError(() => errorResponse);
//       }
//     }
//   }

//   return next(req).pipe(
//     catchError((error: HttpErrorResponse) => {
//       return throwError(() => error);
//     })
//   );
// };

// function getEmptyFields(obj: any): string[] {
//   const emptyFields: string[] = [];

//   Object.keys(obj).forEach((key) => {
//     if (obj[key] === null || obj[key] === undefined ||typeof obj[key] === 'string' && obj[key].trim() === '') {
//       emptyFields.push(key);
//     }
//   });

//   return emptyFields;
// }

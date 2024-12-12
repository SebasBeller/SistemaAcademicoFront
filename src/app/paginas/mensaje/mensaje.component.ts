import { Component, Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
  
})
@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['mensaje.component.sass'], 
})

export class MensajeService {
  mostrarMensajeExitoConCallback(titulo: string, mensaje: string){
    return Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'success',
      confirmButtonColor: '#3085d6',
    })
    ;
  }


  mostrarMensajeExito(titulo: string, mensaje: string) {
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'success',
      confirmButtonColor: '#3085d6',
    });
  }
  mostrarMensajesError(titulo: string, mensajes: string[]) {
    if(!mensajes){
      mensajes=["Ocurrio un error, vuelva mas tarde"];
    }
    const htmlMensajes = `
    <ul style="list-style-type: disc; margin: 0; padding-left: 10%; text-align:left;">
      ${mensajes.map(m => `<li>${m}</li>`).join('')}
    </ul>
  `;
  
    
    Swal.fire({
      title: titulo,
      html: htmlMensajes,
      icon: 'error',
      confirmButtonColor: '#d33',
      customClass: {
        popup: 'custom-swal-popup'
    }
    });
  }
  

  mostrarMensajeError(titulo: string, mensaje: string) {
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'error',
      confirmButtonColor: '#d33',
    });
  }

  mostrarMensajeConfirmacion(titulo: string, mensaje: string, callback: () => void) {
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, continuar!',
      cancelButtonText: 'No, cancelar!'
    }).then((result) => {
      if (result.isConfirmed) {
        callback(); 
      }
    });
  }
}

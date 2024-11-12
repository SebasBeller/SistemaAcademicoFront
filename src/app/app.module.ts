import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Asegúrate de incluir esto
import { routes } from './app.routes'; 
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule


@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    CommonModule,
    FormsModule

  ],

})
export class AppModule {}

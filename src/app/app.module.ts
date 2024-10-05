import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; 
import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { routes } from './app.routes'; 

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)  
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}

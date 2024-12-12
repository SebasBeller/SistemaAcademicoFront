import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import {
  provideHttpClient,
  withInterceptorsFromDi,
  withInterceptors,
} from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor'; 
import { errorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { offlineInterceptor } from './interceptors/offline.interceptor';
// import {emptyFieldsInterceptor } from './interceptors/empty-fields.interceptor';



export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi(),
    withInterceptors([offlineInterceptor,authInterceptor,errorHandlerInterceptor])
  ), 

    provideAnimationsAsync(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'sistemasacademicopdfs',
        appId: '1:397192621494:web:ad71d060eb0c9d804aa517',
        storageBucket: 'sistemasacademicopdfs.appspot.com',
        apiKey: 'AIzaSyADmvaixJEtyYnHIg-k7dqsyaSSDkPnghE',
        authDomain: 'sistemasacademicopdfs.firebaseapp.com',
        messagingSenderId: '397192621494',
        measurementId: 'G-W80L0CRFZM',
      })
    ),
    provideStorage(() => getStorage()),

    
  ],
};

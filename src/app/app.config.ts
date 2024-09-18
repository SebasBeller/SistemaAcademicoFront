import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStorage(() => getStorage()), provideFirebaseApp(() => initializeApp({"projectId":"file-update-3ec62","appId":"1:865106620028:web:a3e9cc311723a3f556e3f9","storageBucket":"file-update-3ec62.appspot.com","apiKey":"AIzaSyDwAxeEhEOgc6_gnf9NMKbEo9d1v1DGaaE","authDomain":"file-update-3ec62.firebaseapp.com","messagingSenderId":"865106620028"}))
  ],
};

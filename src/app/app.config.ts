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
<<<<<<< Marlon_Rama
    provideStorage(() => getStorage()), provideFirebaseApp(() => initializeApp({"projectId":"file-update-3ec62","appId":"1:865106620028:web:a3e9cc311723a3f556e3f9","storageBucket":"file-update-3ec62.appspot.com","apiKey":"AIzaSyDwAxeEhEOgc6_gnf9NMKbEo9d1v1DGaaE","authDomain":"file-update-3ec62.firebaseapp.com","messagingSenderId":"865106620028"}))
=======
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
>>>>>>> main
  ],
};

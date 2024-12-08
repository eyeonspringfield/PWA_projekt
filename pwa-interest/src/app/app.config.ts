import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import {getAuth, provideAuth} from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBkfyeVrrqKBrMtS5np6kSOmcNFPWsLvQE",
  authDomain: "pwa-projekt-interest.firebaseapp.com",
  projectId: "pwa-projekt-interest",
  storageBucket: "pwa-projekt-interest.firebasestorage.app",
  messagingSenderId: "1080260484037",
  appId: "1:1080260484037:web:83875a1c95cc0997f209ac",
  measurementId: "G-J1PRBR7XYY"
};


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp(firebaseConfig)), provideFirestore(() => getFirestore()), provideStorage(() => getStorage()), provideAuth(() => getAuth()), provideAnimationsAsync()]
};

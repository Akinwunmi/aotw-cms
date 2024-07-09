import { IMAGE_CONFIG } from '@angular/common';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { APP_ROUTES } from './app.routes';
import { reducer } from './state/reducers';

function httpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

export const APP_CONFIG: ApplicationConfig = {
  providers: [
    importProvidersFrom([
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient]
        },
      }),
    ]),
    provideAuth(() => getAuth()),
    provideEffects(),
    provideFirebaseApp(() => initializeApp({
      apiKey: import.meta.env['NG_APP_FIREBASE_API_KEY'],
      appId: import.meta.env['NG_APP_FIREBASE_APP_ID'],
      authDomain: import.meta.env['NG_APP_FIREBASE_AUTH_DOMAIN'],
      measurementId: import.meta.env['NG_APP_FIREBASE_MEASUREMENT_ID'],
      messagingSenderId: import.meta.env['NG_APP_FIREBASE_MESSAGING_SENDER_ID'],
      projectId: import.meta.env['NG_APP_FIREBASE_PROJECT_ID'],
      storageBucket: import.meta.env['NG_APP_FIREBASE_STORAGE_BUCKET'],
    })),
    provideFirestore(() => getFirestore()),
    provideHttpClient(),
    provideRouter(APP_ROUTES, withInMemoryScrolling({
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
    })),
    provideRouterStore(),
    provideStore({
      app: reducer,
      router: routerReducer
    }),
    provideStoreDevtools({
      maxAge: 25,
      trace: false,
      traceLimit: 75
    }),
    // ? - Needed to surpress warnings about intrinsic sizing for external SVG sources
    // TODO - Find solution to decrease intrinsic size of external SVG sources
    {
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: true, 
        disableImageLazyLoadWarning: true
      }
    },
  ]
};

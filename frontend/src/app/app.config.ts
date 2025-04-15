import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
// (If you plan to use Angular routing in the future, you could import provideRouter here)

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient()
    // provideRouter(routes) can be added here if using routing
  ]
};
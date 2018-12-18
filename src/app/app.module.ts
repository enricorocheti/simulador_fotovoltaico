import { NgModule, Type } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CovalentHttpModule, IHttpInterceptor } from '@covalent/http';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';

import { AppComponent } from './app.component';
import { RequestInterceptor } from '../config/interceptors/request.interceptor';
import { MOCK_API } from '../config/api.config';

import { routedComponents, AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';
import { ResultDialog } from './simulator/result-dialog.component';
import { ConfirmDialog } from './simulator/confirm-dialog.component';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { USER_PROVIDER, USERS_API } from './users';

const httpInterceptorProviders: Type<any>[] = [
  RequestInterceptor,
];

export function getAPI(): string {
  return MOCK_API;
}

@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
    ResultDialog,
    ConfirmDialog,
  ], // directives, components, and pipes owned by this NgModule
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    CovalentHttpModule.forRoot({
      interceptors: [{
        interceptor: RequestInterceptor, paths: ['**'],
      }],
    }),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyCCNjE42XV4qHCPJWvBGvF61uYqRchWKJ4' }),
    CovalentHighlightModule,
    CovalentMarkdownModule,
  ], // modules needed to run this module
  providers: [
    httpInterceptorProviders,
    Title, {
      provide: USERS_API, useFactory: getAPI,
    }, USER_PROVIDER,
  ], // additional providers needed for this module
  entryComponents: [
    ResultDialog,
    ConfirmDialog,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

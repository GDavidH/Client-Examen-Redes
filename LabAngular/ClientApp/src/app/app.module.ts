import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthInterceptor } from './auth.interceptor';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';

import { GuerrillaService } from './services/guerrilla/guerrillaservice.service';

import { LoginComponent } from './login/login.component';
import { RegisterGuerrilla } from './add/addguerrilla/addguerrilla.component';

import { BasicAuthInterceptor } from './helpers/basic-auth.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';

import { FetchProfileComponent } from './fetch/fecthprofile/fetchprofile.component';
import { RegisterUnit } from './add/addunit/addunit.component';

import { FetchRankingComponent } from './fetch/fetchranking/fetchranking.component';




@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    LoginComponent,
    RegisterGuerrilla,
    FetchProfileComponent,
    RegisterUnit, 
    FetchRankingComponent

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule, 
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },

      { path: 'login-page', component: LoginComponent },
      { path: 'register-gerrilla', component: RegisterGuerrilla },
      { path: 'gerrilla/:name', component: RegisterGuerrilla },

      { path: 'fetch-Ranking', component: FetchRankingComponent },

      { path: 'fetch-profile', component: FetchProfileComponent },
      { path: 'register-Unit', component: RegisterUnit},
      { path: 'unit/:name', component: RegisterGuerrilla },



    ])
    ],

    providers: [ GuerrillaService,{ provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})


export class AppModule { }

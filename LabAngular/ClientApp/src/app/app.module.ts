import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthInterceptor } from './auth.interceptor';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';

import { GuerrillaService } from './services/guerrilla/guerrillaservice.service';

import { LoginComponent } from './login/login.component';
import { RegisterGuerrilla } from './add/addguerrilla/addguerrilla.component';

import { BasicAuthInterceptor } from './helpers/basic-auth.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';

import { FetchProfileComponent } from './fetch/fecthprofile/fetchprofile.component';
import { RegisterUnit } from './add/addunit/addunit.component';

import { FetchRankingComponent } from './fetch/fetchranking/fetchranking.component';

import { FetchAttackComponent } from './fetch/fetchattack/fetchattack.component';




@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    SettingsComponent,
    LoginComponent,
    RegisterGuerrilla,
    FetchProfileComponent,
    RegisterUnit, 
    FetchRankingComponent,
    FetchAttackComponent

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule, 
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'settings', component: SettingsComponent },

      { path: 'login-page', component: LoginComponent },
      { path: 'register-gerrilla', component: RegisterGuerrilla },
      //{ path: 'gerrilla/:name', component: RegisterGuerrilla },

      { path: 'fetch-Ranking', component: FetchRankingComponent },

      { path: 'profile', component: FetchProfileComponent },
      { path: 'add-Units', component: RegisterUnit},
      { path: 'unit/:name', component: RegisterUnit },

      { path: 'attack/:opponentName', component:  FetchAttackComponent},

    ])
    ],

    providers: [ GuerrillaService,{ provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})


export class AppModule { }

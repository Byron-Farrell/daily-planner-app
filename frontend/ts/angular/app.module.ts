import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RootComponent } from './components/root/root.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { PasswordRecoveryComponent } from './components/auth/password-recovery/password-recovery.component';

import { AuthenticationGuardService } from './services/authentication-guard.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PasswordChangeComponent } from './components/auth/password-change/password-change.component';
const routes: Routes = [
  { path: '', component: NavbarComponent, canActivate: [AuthenticationGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'recover-password', component: PasswordRecoveryComponent },

];

@NgModule({
  declarations: [
    RootComponent,
    LoginComponent,
    SignupComponent,
    PasswordRecoveryComponent,
    NavbarComponent,
    PasswordChangeComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }

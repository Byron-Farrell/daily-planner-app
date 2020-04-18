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
import { DiaryEditorComponent } from './components/diary/diary-editor/diary-editor.component';
import { DiaryHistoryComponent } from './components/diary/diary-history/diary-history.component';
import { DiaryViewComponent } from './components/diary/diary-view/diary-view.component';
import { CreateDiaryComponent } from './components/diary/create-diary/create-diary.component';

const routes: Routes = [
  { path: '', component: DiaryViewComponent, canActivate: [AuthenticationGuardService] },
  { path: 'create', component: CreateDiaryComponent, canActivate: [AuthenticationGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'recover-password', component: PasswordRecoveryComponent },
  { path: 'change-password/:username', component: PasswordChangeComponent },

];

@NgModule({
  declarations: [
    RootComponent,
    LoginComponent,
    SignupComponent,
    PasswordRecoveryComponent,
    NavbarComponent,
    PasswordChangeComponent,
    DiaryEditorComponent,
    DiaryHistoryComponent,
    DiaryViewComponent,
    CreateDiaryComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }

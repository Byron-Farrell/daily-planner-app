import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDetails } from '../interfaces/login-details';
import { RegistrationDetails } from '../interfaces/registration-information-details';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  static HOST = 'http://127.0.0.1:3000/';
  static LOGIN_URI = 'login';
  static REGISTER_URI = 'signup';

  private token;

  public errorMessage;

  constructor(private router: Router) {
    this.errorMessage;
  }

  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  public register(accountDetails: RegistrationDetails): Promise<any> {
    const URI = AuthenticationService.HOST + AuthenticationService.REGISTER_URI;

    return new Promise((resolve, reject) => {
      fetch(URI, {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(accountDetails)
      })
      .then(response => response.json())
      .then((json: any) => {
        if (json.success) {
          this.saveToken(json.token);
        }
        resolve(json);
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  public login(user: LoginDetails): Promise<any> {
    const URI = AuthenticationService.HOST + AuthenticationService.LOGIN_URI;

    return new Promise((resolve, reject) => {
      fetch(URI, {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then(response => response.json())
      .then((json: any) => {
        if (json.success) {
          this.saveToken(json.token);
        }

        resolve(json);
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/login');
  }

  private getPayload(): any {
    const token = this.getToken();
    let payload;

    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);

      return JSON.parse(payload);
    }
    else {
      return false
    }
  }

  public isLoggedIn(): boolean {
    let token = this.getToken();

    if (token) {
      return true;
    }
    else {
      return false;
    }
  }

}

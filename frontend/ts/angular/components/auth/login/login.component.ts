import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { LoginDetails } from '../../../interfaces/login-details'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public errorMessage: string;

  constructor(private auth: AuthenticationService, private router: Router) {
    this.errorMessage = '';
  }

  ngOnInit() {
  }

  login(): void {
    let username = <HTMLInputElement> document.getElementById('loginUsername');
    let password = <HTMLInputElement> document.getElementById('loginPassword');

    let user: LoginDetails = {
      username: username.value,
      password: password.value
    };

    this.auth.login(user).then((json: any) => {
      console.log(json);

      if (json.success) {
        this.router.navigateByUrl('/');
      }
      else {
        this.errorMessage = json.errorMessage;
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {

  public password1: string;
  public password2: string;
  public username: string;
  public errorMessage: string;

  constructor(private auth: AuthenticationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');
  }

  public updatePassword1(event): void {
    this.password1 = event.target.value;
  }

  public updatePassword2(event): void {
    this.password2 = event.target.value;
  }

  private validPassword(): boolean {
    if (this.password1 !== this.password2) {
      this.errorMessage = 'Passwords don\'t match';
      return false;
    }
    else if (!this.password1) {
      this.errorMessage = 'Password can\'t be blank';
      return false;
    }
    else {
      return true;
    }
  }

  public submit(): void {
    if (this.validPassword()) {
      this.auth.changePassword(this.username, this.password1)
      .then(_ => console.log('ddddddddddddd'))
      .then(_ => this.router.navigateByUrl('/login'))
      .catch(_ => this.errorMessage = 'Unable to update password. Please try again later.');
    }
  }

}

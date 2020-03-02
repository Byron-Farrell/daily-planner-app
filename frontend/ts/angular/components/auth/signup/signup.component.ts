import { Component, OnInit } from '@angular/core';
import { RegistrationDetails } from '../../../interfaces/registration-information-details';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public errorMessage: string;
  public selectedQuestion: string;
  public secretQuestions: Array<string>;

  private username: string;
  private password1: string;
  private password2: string;
  private secretAnswer: string;

  constructor(private auth: AuthenticationService, private router: Router) {
    this.errorMessage = '';
  }

  ngOnInit() {
    this.secretQuestions = [
      'What\'s the name of your first pet?',
      'What\'s the name of your best friend in high school?',
    ]

    this.selectedQuestion = this.secretQuestions[0];
  }

  // ***************************************
  // Updates
  // ***************************************
  
  public updateUsername(event): void {
    this.username = event.target.value;
  }

  public updatePassword1(event): void {
    this.password1 = event.target.value;
  }

  public updatePassword2(event): void {
    this.password2 = event.target.value;
  }

  public updateSecretAnswer(event): void {
    this.secretAnswer = event.target.value;
  }

  // ***************************************
  // Validations
  // ***************************************

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

  private validateUsername(): boolean {
    if (!this.username) {
      this.errorMessage = 'Username can\'t be blank';
      return false;
    }
    else {
      return true;
    }
  }

  private validateSecretQuestion(): boolean {
    if (!this.secretAnswer) {
      this.errorMessage = 'Secret question can\'t be blank';
      return false;
    }
    else {
      return true;
    }
  }

  // ***************************************
  // Registration
  // ***************************************

  public register(): void {
    if (
      this.validPassword() &&
      this.validateUsername() &&
      this.validateSecretQuestion()
    ) {
      let accountDetails: RegistrationDetails = {
        username: this.username,
        password: this.password1,
        secretQuestion: this.selectedQuestion,
        secretAnswer: this.secretAnswer
      };

      this.auth.register(accountDetails).then((json: any) => {
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
}

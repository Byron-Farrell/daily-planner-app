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

  private validPassword(): boolean {
    let password1 = <HTMLInputElement> document.getElementById('password1');
    let password2 = <HTMLInputElement> document.getElementById('password2');

    if (password1.value !== password2.value) {
      this.errorMessage = 'Passwords don\'t match';
      return false;
    }
    else {
      return true;
    }
  }

  public register(): void {
    if (this.validPassword()) {
      let username = <HTMLInputElement> document.getElementById('registrationUsername');
      let password = <HTMLInputElement> document.getElementById('password1');
      let secretQuestion = this.selectedQuestion;
      let secretAnswer = <HTMLInputElement> document.getElementById('secretQuestionAnswer');

      let accountDetails: RegistrationDetails = {
        username: username.value,
        password: password.value,
        secretQuestion: secretQuestion,
        secretAnswer: secretAnswer.value
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

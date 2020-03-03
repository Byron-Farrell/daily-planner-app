import { Component, OnInit } from '@angular/core';
import { PasswordRecoveryDetails } from '../../../interfaces/password-recovery-details';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {

  public selectedQuestion: string;
  public secretQuestions: Array<string>;
  public errorMessage: string;

  private username: string;
  private secretAnswer: string;

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.secretQuestions = [
      'What\'s the name of your first pet?',
      'What\'s the name of your best friend in high school?',
    ]

    this.selectedQuestion = this.secretQuestions[0];
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

  private validateSecretAnswer(): boolean {
    if (!this.secretAnswer) {
      this.errorMessage = 'Secret answer can\'t be blank';
      return false;
    }
    else {
      return true;
    }
  }

  public updateUsername(event): void {
    this.username = event.target.value;
  }

  public updateSecretAnswer(event): void {
    this.secretAnswer = event.target.value;
  }

  public submit(): void {
    if (
      this.validateUsername() &&
      this.validateSecretAnswer()
    ) {
      let recoveryDetails: PasswordRecoveryDetails = {
        username: this.username,
        secretQuestion: this.selectedQuestion,
        secretAnswer: this.secretAnswer
      };

      this.auth.recoverPassword(recoveryDetails)
      .then(json => {
        console.log(json);

        if (json.success) {
          console.log('DONE');
        }
        else {
          this.errorMessage = json.errorMessage;
        }
      })
    }
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public errorMessage: string;
  public selectedQuestion: string;
  public secretQuestions: Array<string>;

  constructor() {
    this.errorMessage = '';
  }

  ngOnInit() {
    this.secretQuestions = [
      'What\'s the name of your first pet?',
      'What\'s the name of your best friend in high school?',
    ]

    this.selectedQuestion = this.secretQuestions[0];
  }

  public validate(): void {
    // reset error messages
    this.errorMessage = '';
    this.validatePassword();
  }

  private validatePassword(): void {
    let password1 = <HTMLInputElement> document.getElementById('password1');
    let password2 = <HTMLInputElement> document.getElementById('password2');

    if (password1.value !== password2.value) {
      this.errorMessage = 'Passwords don\'t match';
    }
  }
}

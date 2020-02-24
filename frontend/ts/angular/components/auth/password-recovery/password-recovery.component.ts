import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {

  public selectedQuestion: string;
  public secretQuestions: Array<string>;

  constructor() { }

  ngOnInit() {
    this.secretQuestions = [
      'What\'s the name of your first pet?',
      'What\'s the name of your best friend in high school?',
    ]

    this.selectedQuestion = this.secretQuestions[0];
  }

}

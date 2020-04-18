import { Component, OnInit } from '@angular/core';
import { DiaryService } from '../../../services/diary.service';

@Component({
  selector: 'app-create-diary',
  templateUrl: './create-diary.component.html',
  styleUrls: ['./create-diary.component.scss']
})
export class CreateDiaryComponent implements OnInit {

  constructor(private diaryService: DiaryService) { }

  ngOnInit() {
    document.getElementById('newDiaryErrorAlert').style.display = 'none';
    document.getElementById('newDiarySuccessAlert').style.display = 'none';
  }

  public createDiary(): void {
    let title = <HTMLInputElement> document.getElementById('diaryTitle');
    let content = <HTMLInputElement> document.getElementById('diaryContent');
    let errorAlert = document.getElementById('newDiaryErrorAlert');
    let errorMessage = document.getElementById('newDiaryError');
    let successAlert = document.getElementById('newDiarySuccessAlert')
    let successMessage = document.getElementById('newDiarySuccess')

    if (content.value === '') {
      errorAlert.style.display = 'block';
      errorMessage.innerHTML = 'You didn\'t add any content to your diary';
      return
    }

    errorAlert.style.display = 'none';
    successAlert.style.display = 'none';

    let processing = this.diaryService.create(title.value, content.value);

    processing.then(json => {
      if (json.success) {
        successAlert.style.display = 'block';
        successMessage.innerHTML = 'Diary created';
      }
      else {
        errorAlert.style.display = 'block';
        errorMessage.innerHTML = json.errorMessage;
      }
    });
  }
}

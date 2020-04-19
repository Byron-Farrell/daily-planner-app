import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DiaryService } from '../../../services/diary.service';

@Component({
  selector: 'app-diary-editor',
  templateUrl: './diary-editor.component.html',
  styleUrls: ['./diary-editor.component.scss']
})
export class DiaryEditorComponent implements OnInit {

  @Input() title: string;
  @Input() content: string;
  @Output() reloadDiary = new EventEmitter<void>();

  constructor(private diaryService: DiaryService) { }

  ngOnInit() {
    document.getElementById('updateSuccessAlert').style.display = 'none';
  }

  public updateContent(): void {
    let elem = <HTMLInputElement> document.getElementById('contentBox');
    this.content = elem.value;
  }

  public updateDiary(): void {
    console.log(this.content);

    this.diaryService.update(this.title, this.content)
      .then(json => {
        if (json.success) {
          document.getElementById('updateSuccessAlert').style.display = 'block';
        }
      })
  }

  public deleteDiary(): void {
    this.diaryService.delete(this.title).then(json => {
      if (json.success) {
        this.reloadDiary.emit();
      }
    })
  }
}

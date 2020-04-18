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
  @Output() diaryDeleted = new EventEmitter<void>();

  constructor(private diaryService: DiaryService) { }

  ngOnInit() {
  }

  public deleteDiary(): void {
    this.diaryService.delete(this.title).then(json => {
      if (json.success) {
        this.diaryDeleted.emit();
      }
    })
  }
}

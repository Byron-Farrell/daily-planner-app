import { Component, OnInit } from '@angular/core';
import { DiaryService } from '../../../services/diary.service';

@Component({
  selector: 'app-diary-view',
  templateUrl: './diary-view.component.html',
  styleUrls: ['./diary-view.component.scss']
})
export class DiaryViewComponent implements OnInit {

  private toggle: boolean;
  public diaries: any;
  public selectedDiary: any;

  constructor(private diaryService: DiaryService) {
    this.toggle = true;
    this.selectedDiary = {
      'title': '',
      'content': ''
    }
  }

  ngOnInit() {
    this.diaryService.get().then(json => {
      this.diaries = json.diaries;
      if (json.diaries.length > 0) {
        this.selectedDiary.title = json.diaries[0].title;
        this.selectedDiary.content = json.diaries[0].content;
      }
    });
  }

  public updateDiary(title: string) {
    this.diaries.forEach(diary => {
      if (diary.title === title) {
        this.selectedDiary.title = diary.title;
        this.selectedDiary.content = diary.content;
      }
    })
  }

  public toggleSidePanel(event: any) {
    let sidePanel = document.getElementById('DiarySidePanel');
    let content = document.getElementById('DiaryMainContent');

    let expand = document.getElementById('ExpandSidePanel');
    let hide = document.getElementById('HideSidePanel');

    if (this.toggle) {
      content.className = 'bg-white m-0 p-4 col-lg-12';
      sidePanel.className = 'd-none';
      expand.className = 'fas fa-angle-right pointer text-dark';
      this.toggle = !this.toggle;
    }
    else {
      sidePanel.className = 'bg-light border-right p-4 col-lg-2 h-100';
      content.className = 'bg-white p-4 col-lg-10';
      expand.className = 'd-none';
      this.toggle = !this.toggle;

    }
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diary-view',
  templateUrl: './diary-view.component.html',
  styleUrls: ['./diary-view.component.scss']
})
export class DiaryViewComponent implements OnInit {

  private toggle: boolean;

  constructor() {
    this.toggle = true;
  }

  ngOnInit() {
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

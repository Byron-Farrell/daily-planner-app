import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-diary-editor',
  templateUrl: './diary-editor.component.html',
  styleUrls: ['./diary-editor.component.scss']
})
export class DiaryEditorComponent implements OnInit {

  @Input() title: string;
  @Input() content: string;

  constructor() { }

  ngOnInit() {
  }

}

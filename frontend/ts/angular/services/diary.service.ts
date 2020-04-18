import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  private HOST: string;
  private DIARY_URI: string;
  private diaries: any;

  constructor(private auth: AuthenticationService) {
    this.HOST = '';
    this.DIARY_URI = 'diary';
    this.diaries = null;
  }

  public getDiaries(): any {
    return this.diaries;
  }

  public getDiary(title: string) {
    this.diaries.forEach(diary => {
      if (diary.title === title) {
        return diary;
      }
    });

    console.log('Unable to find diary with title: ' + title);


    return null;
  }

  public create(title: string, content: string): Promise<any> {
    const URI = AuthenticationService.HOST + this.DIARY_URI;
    let token = this.auth.getToken();

    return new Promise((resolve, reject) => {
      fetch(URI, {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'bearer ' + token
        },
        body: JSON.stringify({
          'title': title,
          'content': content
        })
      })
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(error => reject(error));
    });
  }

  public get(): Promise<any> {
    const URI = AuthenticationService.HOST + this.DIARY_URI;
    let token = this.auth.getToken();

    return new Promise((resolve, reject) => {
      fetch(URI, {
        method: 'GET',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'bearer ' + token
        }
      })
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(error => reject(error));
    });
  }
}

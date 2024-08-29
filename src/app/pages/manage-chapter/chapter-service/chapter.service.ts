import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject, Subscriber } from 'rxjs';
import { catchError, subscribeOn, timeout } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ChapterService {
  tabVisible = new Subject<any>();
  imageValue = new Subject<any>();
  audioValue = new Subject<any>();
  videoValue = new Subject<any>();
  pdfValue = new Subject<any>();
  TextValue = new Subject<any>();


  passIndexFromAddQues = false;
  quesAddOrEdit = false;
  passTabHeader = new Subject<string>();
  FromChapterToQuestion = new Subject<number>();
  FromAddQuesToQuesList = new Subject<number>();
  passChapNameToQues = new Subject<string>();
  passChapdurationToQues = new Subject<number>();
  passChapDesToQues = new Subject<string>();
  passIdToQues = new Subject<string>();
  enableTabFAQtoQ = new Subject<boolean>();




  url = 'http://localhost:3000/posts';
  addChapterUrl = 'https://api-vidhya.viitorcloud.in/admin/chapter/save';
  url1 = 'https://api-vidhya.viitorcloud.in/admin/chapter/display';
  delUrl = 'https://api-vidhya.viitorcloud.in/admin/chapter/delete';
  editUrl = 'https://api-vidhya.viitorcloud.in/admin/chapter/display/singleChapter';
  updateUrl = 'https://api-vidhya.viitorcloud.in/admin/chapter/update';
  getQuestion = 'https://api-vidhya.viitorcloud.in/question/getquestions';
  baseURL: any = 'http://localhost:3000/questions';
  delQuestion = 'https://api-vidhya.viitorcloud.in/question/questionDelete';
  editQues = 'https://api-vidhya.viitorcloud.in/question/questionEdit';
  updateQues = 'https://api-vidhya.viitorcloud.in/question/questionUpdate';

  constructor(private http: HttpClient) {}
  // tslint:disable-next-line: typedef
  saveChapter(data: any) {
    return this.http.post(this.addChapterUrl, data);
  }

  vidhyaDemo(): any {
    return this.http.get(this.url1);
  }
  deleteChapter(id: number): any {
    return this.http.get(`${this.delUrl}/${id}`);
  }
  DisplayChapterDetail(id: string): any{
    return this.http.get(`${this.url1}/${id}`);
  }
  // tslint:disable-next-line: typedef
  saveQuestion(data: any) {
    return this.http.post(
      'https://api-vidhya.viitorcloud.in/question/savequestion',
      data
    );
  }
  questionList(id: string): any {
    return this.http.get(`${this.getQuestion}/${id}`);
  }
  convertToBase64(file: File): any {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    observable.subscribe((data) => {
      return data;
    });
    return observable;
  }
  readFile(file: File, subscriber: Subscriber<any>): void {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
    };
  }
  editChapter(id: number): any {
    return this.http.get(`${this.editUrl}/${id}`);
  }
  updateChapter(data: any): any {
    return this.http.post(`${this.updateUrl}`, data);
  }
  deleteQuestion(id: any): any {
    return this.http.post(this.delQuestion, id);
  }
  editQuestion(quesId: any): any {
    return this.http.post(this.editQues, quesId);
  }
  updateQuestion(data: any): any {
    return this.http.post(this.updateQues, data);
  }
}

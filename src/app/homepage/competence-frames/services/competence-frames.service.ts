import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { listOfVietnamese } from 'src/app/shared/config';
import { ComFrame } from '../../model/competence-frames.model';
import { Application, Recruit, ResponseObject } from '../../model/news.model';
import { CompetenceFramesEntryComponent } from '../competence-frames-entry/competence-frames-entry.component';

@Injectable({
  providedIn: 'root',
})
export class CompetenceFramesService {
  public listviet = listOfVietnamese;
  public conditionDup = false;
  public comframe = new ComFrame();
  public listCom: ComFrame[] = [];
  public recruit = new Recruit();
  public listRecruit: Recruit[] = [];
  urlPath = 'https://server-api.newscv.tech';
  private refreshBehavior = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {
    this.initListPool();
  }

  public getRefresh() {
    return this.refreshBehavior;
  }
  public refresh() {
    this.refreshBehavior.next(this.refreshBehavior.value + 1);
  }
  public getListOfCompetences() {
    console.log('complet');
    return of(this.listRecruit);
  }
  applyCv(apply: Application): Observable<any> {
    const token = localStorage.getItem('token');
    console.log('token', token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<ResponseObject>(
      `${this.urlPath + '/api/v1/application'}`,
      apply,
      { headers: headers }
    );
  }
  getAllAdvert() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<ResponseObject>(
      `${this.urlPath + '/api/v1/advertisement/get-all'}`,
      { headers: headers }
    );
  }
  async initListPool() {
    await this.getListRecruit().subscribe((res) => {
      this.listRecruit = res.data;
    });
  }

  getListRecruit() {
    return this.http.get<ResponseObject>(
      `${this.urlPath + '/api/v1/job-news/get-all'}`
    );
  }
  getCompanyByCode(code: string) {
    return this.http.post<ResponseObject>(
      `${this.urlPath + '/api/v1/company/get-by-code/' + code}`,
      ''
    );
  }
  createJobNews(recruit: Recruit) {
    const token = localStorage.getItem('token');
    console.log('token', token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<ResponseObject>(
      `${this.urlPath + '/api/v1/job-news'}`,
      recruit,
      { headers: headers }
    );
  }
  CheckAppli(userId: string, jobId?: string) {
    const token = localStorage.getItem('token');
    console.log('token', token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<ResponseObject>(
      `${
        this.urlPath +
        '/api/v1/application/get-application-by-user-and-by-job/' +
        userId +
        '/' +
        jobId
      }`,
      '',
      { headers: headers }
    );
  }
  updateJobNews(recruit: Recruit) {
    const token = localStorage.getItem('token');
    console.log('token', token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.put<ResponseObject>(
      `${this.urlPath + '/api/v1/job-news/' + recruit.id}`,
      recruit,
      { headers: headers }
    );
  }
  deleteCompetenceByCode(code: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete<ResponseObject>(
      `${this.urlPath + '/api/v1/job-news/delete-by-code/' + code}`,
      { headers: headers }
    );
  }
  public getComFrameInfo(id?: string): Observable<ComFrame | undefined> {
    if (!id) {
      return of(new ComFrame());
    }
    return of(this.listCom.find((item) => item.id === id));
  }
  public getRecruitInfo(id?: string): Observable<Recruit | undefined> {
    if (!id) {
      return of(new Recruit());
    }
    return of(this.listRecruit.find((item) => item.code === id));
  }
  public getRandomId(): string {
    let text = '';
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 24; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  public isComFrameExist(id: string) {
    return this.listRecruit.find((item) => item.code === id) ? true : false;
  }

  public getComFrame(id: string) {
    return this.listRecruit.find((item) => item.code === id);
  }
  checkVietnames(str: string) {
    str = str.toLowerCase();
    if (this.listviet.includes(str)) {
      return true;
    } else {
      return false;
    }
  }
  public toLowerCaseNonAccentVietnamese(value: string, searchText?: string) {
    value = value.toLowerCase();
    if (searchText && this.checkVietnames(searchText)) {
      return value;
    } else {
      //     We can also use this instead of from line 11 to line 17
      //     str = str.replace(/\u00E0|\u00E1|\u1EA1|\u1EA3|\u00E3|\u00E2|\u1EA7|\u1EA5|\u1EAD|\u1EA9|\u1EAB|\u0103|\u1EB1|\u1EAF|\u1EB7|\u1EB3|\u1EB5/g, "a");
      //     str = str.replace(/\u00E8|\u00E9|\u1EB9|\u1EBB|\u1EBD|\u00EA|\u1EC1|\u1EBF|\u1EC7|\u1EC3|\u1EC5/g, "e");
      //     str = str.replace(/\u00EC|\u00ED|\u1ECB|\u1EC9|\u0129/g, "i");
      //     str = str.replace(/\u00F2|\u00F3|\u1ECD|\u1ECF|\u00F5|\u00F4|\u1ED3|\u1ED1|\u1ED9|\u1ED5|\u1ED7|\u01A1|\u1EDD|\u1EDB|\u1EE3|\u1EDF|\u1EE1/g, "o");
      //     str = str.replace(/\u00F9|\u00FA|\u1EE5|\u1EE7|\u0169|\u01B0|\u1EEB|\u1EE9|\u1EF1|\u1EED|\u1EEF/g, "u");
      //     str = str.replace(/\u1EF3|\u00FD|\u1EF5|\u1EF7|\u1EF9/g, "y");
      //     str = str.replace(/\u0111/g, "d");
      value = value.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
      value = value.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
      value = value.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
      value = value.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
      value = value.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
      value = value.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
      value = value.replace(/đ/g, 'd');
      // Some system encode vietnamese combining accent as individual utf-8 characters
      value = value.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
      value = value.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
      return value;
    }
  }
}

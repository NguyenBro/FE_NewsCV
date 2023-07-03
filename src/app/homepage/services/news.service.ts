import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stringify } from 'querystring';
import { catchError, Observable, of, tap } from 'rxjs';

import {
  competion,
  event,
  Otp,
  ResponseObject,
  scholarship,
  user,
  Comment,
} from '../model/news.model';

@Injectable({
  providedIn: 'root',
})
export class newsService {
  subjects: any;
  userLogin: user = new user();
  role = '';
  token = '';
  isShowScholarship: boolean = false;
  isShowEvent: boolean = false;
  isShowCompetition: boolean = false;
  public listviet = [
    'à',
    'á',
    'ạ',
    'ả',
    'ã',
    'â',
    'ầ',
    'ấ',
    'ậ',
    'ẩ',
    'ẫ',
    'ă',
    'ằ',
    'ắ',
    'ặ',
    'ẳ',
    'ẵ',
    'è',
    'é',
    'ẹ',
    'ẻ',
    'ẽ',
    'ê',
    'ề',
    'ế',
    'ệ',
    'ể',
    'ễ',
    'ì',
    'í',
    'ị',
    'ỉ',
    'ĩ',
    'ò',
    'ó',
    'ọ',
    'ỏ',
    'õ',
    'ô',
    'ồ',
    'ố',
    'ộ',
    'ổ',
    'ỗ',
    'ơ',
    'ờ',
    'ớ',
    'ợ',
    'ở',
    'ỡ',
    'ù',
    'ú',
    'ụ',
    'ủ',
    'ũ',
    'ư',
    'ừ',
    'ứ',
    'ự',
    'ử',
    'ữ',
    'ỳ',
    'ý',
    'ỵ',
    'ỷ',
    'ỹ',
    'đ',
  ];
  public conditionDup = false;
  public scholarship = new scholarship();
  public listScholarship: scholarship[] = [];
  public listEvent: event[] = [];
  public listCompetiton: competion[] = [];
  constructor(private http: HttpClient) {
    this.initlistScholarship();
    this.initlistEvent();
    this.initlistCompetiton();
  }
  urlPath = 'https://server-api.newscv.tech';
  login(user: user) {
    return this.http.post<ResponseObject>(
      `${this.urlPath + '/api/v1/login'}`,
      user
    );
  }
  logOut() {
    return this.http.get<ResponseObject>(`${this.urlPath + '/api/v1/logout'}`);
  }
  createOtpMail(user: user) {
    return this.http.post<ResponseObject>(
      `${this.urlPath + '/client/create'}`,
      user
    );
  }
  checkOtp(otp: Otp) {
    return this.http.post<ResponseObject>(
      `${this.urlPath + '/client/check-otp'}`,
      otp
    );
  }
  addUser(user: user) {
    return this.http.post<ResponseObject>(
      `${this.urlPath + '/api/v1/user'}`,
      user
    );
  }
  getInfo(email: string) {
    return this.http.post<ResponseObject>(
      `${this.urlPath + '/api/v1/user-by-email/' + email}`,
      ''
    );
  }
  getLoggedInUser(email: string): Observable<any> {
    console.log('token', this.urlPath + '/api/v1/user-by-email/');
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<ResponseObject>(
      `${this.urlPath + '/api/v1/user-by-email/' + email}`,
      '',
      { headers: headers }
    );
  }
  getRoleByEmail(email: string): Observable<any> {
    console.log('token', this.urlPath + '/api/v1/user-by-email/');
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<ResponseObject>(
      `${this.urlPath + '/api/v1/get-role/' + email}`,
      '',
      { headers: headers }
    );
  }

  getListComment(id?: string) {
    return this.http.post<ResponseObject>(
      `${this.urlPath + '/api/v1/comment-enable/get-by-news/' + id}`,
      ''
    );
  }
  updateCmt(id: string, content: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<ResponseObject>(
      `${this.urlPath + '/api/v1/comment/update-content/' + id}`,
      { content: content },
      { headers: headers }
    );
  }
  disableCmt(id: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<ResponseObject>(
      `${this.urlPath + '/api/v1/comment/update-disable/' + id}`,
      '',
      { headers: headers }
    );
  }
  addComment(comment: Comment) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<ResponseObject>(
      `${this.urlPath + '/api/v1/comment'}`,
      comment,
      { headers: headers }
    );
  }

  // login(newUser: user): Observable<user> {
  //   return this.http.post<user>(`${this.urlPath + '/api/v1/login'}`, newUser);
  // }
  // login(newUser: user): Observable<user> {
  //   return this.http.post<user>(this.urlPath + '/api/v1/login', newUser).pipe(
  //     tap((user: user) => console.log(`inserted user=${JSON.stringify(user)}`)),
  //     catchError((error) => of(new user()))
  //   );
  // }
  // post(link:string, body:any){
  //   return this.http.post(link,body).toPromise();
  // }
  getListOfScholarship() {
    return of(this.listScholarship);
  }
  getListOfEvent() {
    return of(this.listEvent);
  }
  getListOfCompetion() {
    return of(this.listCompetiton);
  }
  getAllTalents() {
    return this.http.get(this.urlPath);
  }
  getTalent(id: string) {
    return this.http.get(`${this.urlPath}/${id}`);
  }

  createTalent(data: any) {
    return this.http.post(`${this.urlPath}`, data);
  }

  updateTalent(data: any) {
    return this.http.post(`${this.urlPath}/${data._id}`, data);
  }
  deleteTalent(id: string) {
    return this.http.delete(`${this.urlPath}/${id}`);
  }
  initlistScholarship() {
    this.getListScholarship().subscribe((res) => {
      this.listScholarship = res.data;
    });
  }
  getListScholarship() {
    return this.http.get<ResponseObject>(
      `${this.urlPath + '/api/v1/scholarship-news/get-all'}`
    );
  }
  initlistEvent() {
    this.getListEvent().subscribe((res) => {
      this.listEvent = res.data;
    });
  }
  getListEvent() {
    return this.http.get<ResponseObject>(
      `${this.urlPath + '/api/v1/event-news/get-all'}`
    );
  }
  initlistCompetiton() {
    this.getListCompetiton().subscribe((res) => {
      this.listCompetiton = res.data;
    });
  }
  getListCompetiton() {
    return this.http.get<ResponseObject>(
      `${this.urlPath + '/api/v1/contest-news/get-all'}`
    );
  }
  create(scholar: scholarship) {
    this.listScholarship.unshift(scholar);
  }
  update(scholar: scholarship) {
    this.listScholarship.forEach((scholarship: scholarship, idx: number) => {
      if (scholarship.id == scholar.id) {
        this.listScholarship[idx] = scholar;
        return;
      }
    });
  }
  delete(scholar: scholarship) {
    for (let i = 0; i < this.listScholarship.length; i++) {
      if (this.listScholarship[i] === scholar) {
        this.listScholarship.splice(i, 1);
      }
    }
  }

  deleteById(id: string) {
    this.listScholarship.forEach((scholarship: scholarship, idx: number) => {
      if (scholarship.code == id) {
        this.listScholarship.splice(idx, 1);
      }
    });
  }

  // public getscholarshipInfo(id?: string): Observable<scholarship | undefined> {
  //   if (!id) {
  //     return of(emptyscholarshipInformation);
  //   }
  //   return of(this.listScholarship.find((item) => item.id === id));
  // }
  public getRandomId(): string {
    let text = '';
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 24; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  public isscholarshipExist(id: string) {
    return this.listScholarship.find((item) => item.code === id) ? true : false;
  }

  public getscholarship(id: string) {
    return this.listScholarship.find((item) => item.code === id);
  }
  public filtercompetion(data: any) {
    return this.http.post<ResponseObject>(
      `${this.urlPath + '/api/v1/get-news-filter'}`,
      data
    );
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
}

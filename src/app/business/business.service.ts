import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Advertisement, ResponseObject } from '../homepage/model/news.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  urlPath = 'https://server-api.newscv.tech';
  constructor(private http: HttpClient) {}
  getAllTrans() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<ResponseObject>(
      `${this.urlPath + '/api/v1/transaction-history/get-all'}`,
      { headers: headers }
    );
  }
  getAllTransByTime(month: string, year: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<ResponseObject>(
      `${
        this.urlPath +
        '/api/v1/transaction-history/get-all-by-time?month=' +
        month +
        '&year=' +
        year
      }`,
      { headers: headers }
    );
  }
  getAllSubHis() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<ResponseObject>(
      `${this.urlPath + '/api/v1/subscription-history/get-all'}`,
      { headers: headers }
    );
  }
  getTransByCom(code: String) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<ResponseObject>(
      `${this.urlPath + '/api/v1/transaction-history/get-by-company/' + code}`,
      { headers: headers }
    );
  }
  getSubHisByCom(code: String) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<ResponseObject>(
      `${this.urlPath + '/api/v1/subscription-history/get-by-company/' + code}`,
      { headers: headers }
    );
  }
  getExpSubByCom(code: String) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<ResponseObject>(
      `${
        this.urlPath +
        '/api/v1/subscription-history/get-expire-subscription-by-company/' +
        code
      }`,
      { headers: headers }
    );
  }
  checkExpSubByCom(code: string, type: String) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<ResponseObject>(
      `${
        this.urlPath +
        '/api/v1/subscription-history/check-expire-subscription-by-company/' +
        code +
        '?type=' +
        type
      }`,
      { headers: headers }
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
  searchCompany(name: string): Observable<any> {
    return this.http.post<ResponseObject>(
      `${this.urlPath + '/api/v1/company/search/' + name}`,
      ''
    );
  }
  logOut() {
    return this.http.get<ResponseObject>(`${this.urlPath + '/api/v1/logout'}`);
  }
  getSubNumByTime(month: String, year: String, type: String) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<ResponseObject>(
      `${
        this.urlPath +
        '/api/v1/subscription-history/get-subscription-number-by-month-and-year?month=' +
        month +
        '&year=' +
        year +
        '&type=' +
        type
      }`,
      { headers: headers }
    );
  }
  getSubNum() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<ResponseObject>(
      `${
        this.urlPath + '/api/v1/subscription-history/get-subscription-number'
      }`,
      { headers: headers }
    );
  }
  updateImage(formData: FormData) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post<ResponseObject>(
      `${this.urlPath + '/api/v1/imageFirebase'}`,
      formData,
      {
        headers: headers,
      }
    );
  }
  applyImage(advert: Advertisement): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<ResponseObject>(
      `${this.urlPath + '/api/v1/advertisement'}`,
      advert,
      { headers: headers }
    );
  }
}

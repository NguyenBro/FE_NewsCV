import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  ResponseObject,
  Subscription,
} from 'src/app/homepage/model/news.model';

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  urlPath = 'https://server-api.newscv.tech';
  constructor(private http: HttpClient) {}
  getAllSubscription() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<ResponseObject>(
      `${this.urlPath + '/api/v1/subscription/get-all'}`,
      { headers: headers }
    );
  }
  getSubscriptionByCode(code?: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<ResponseObject>(
      `${this.urlPath + '/api/v1/subscription/get-by-code/' + code}`,
      { headers: headers }
    );
  }
  getPay(company: string, code?: string, price?: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(
      `${
        this.urlPath + '/payment/' + company + '/' + code + '?price=' + price
      }`,
      {
        headers: headers,
        responseType: 'text',
      }
    );
  }
}

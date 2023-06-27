import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AutoJob, ResponseObject } from '../model/news.model';

@Injectable({
  providedIn: 'root',
})
export class InfomationService {
  urlPath = 'https://server-api.newscv.tech';
  private refreshBehavior = new BehaviorSubject<number>(0);
  constructor(private http: HttpClient) {}
  public getRefresh() {
    return this.refreshBehavior;
  }
  getApplicationByUser(id: String, type: String) {
    const token = localStorage.getItem('token');
    console.log('token', token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<ResponseObject>(
      `${
        this.urlPath +
        '/api/v1/application/get-application-by-user/' +
        id +
        '?status=' +
        type
      }`,
      '',
      { headers: headers }
    );
  }
  getCVUserByStatus(id: String, type: String) {
    const token = localStorage.getItem('token');
    console.log('token', token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<ResponseObject>(
      `${
        this.urlPath +
        '/api/v1/application/get-cv-by-user-and-status/' +
        id +
        '?status=' +
        type
      }`,
      '',
      { headers: headers }
    );
  }
  getInteractiveNewsById(id: String, type: String) {
    const token = localStorage.getItem('token');
    console.log('token', token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<ResponseObject>(
      `${
        this.urlPath + '/api/v1/get-interactive-news/' + id + '?type=' + type
      }`,
      { headers: headers }
    );
  }
  getByIdAutoJob(id?: String) {
    const token = localStorage.getItem('token');
    console.log('token', token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<ResponseObject>(
      `${
        this.urlPath + '/api/v1/auto-job/get-by-id/' + id + '?status='}`,
        '',
      { headers: headers }
    );
  }
  offByIdAutoJob(id?: String) {
    const token = localStorage.getItem('token');
    console.log('token', token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<ResponseObject>(
      `${
        this.urlPath + '/api/v1/auto-job/get-by-id/' + id + '?status=Off'}`,
        '',
      { headers: headers }
    );
  }
  updateAutoJob(auto: AutoJob,id?: String) {
    const token = localStorage.getItem('token');
    console.log('token', token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<ResponseObject>(
      `${
        this.urlPath + '/api/v1/auto-job/update/' + id}`,
        auto,
      { headers: headers }
    );
  }
}

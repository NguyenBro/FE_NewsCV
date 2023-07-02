import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ResponseObject,
  ScheduleInterview,
} from 'src/app/homepage/model/news.model';

@Injectable({
  providedIn: 'root',
})
export class ScheduleInterviewService {
  urlPath = 'https://server-api.newscv.tech';
  applicantName = '';
  applicantEmail = '';
  applicantId = '';
  constructor(private http: HttpClient) {}
  addInterviewSchedule(model: ScheduleInterview): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<ResponseObject>(
      `${this.urlPath + '/api/v1/interview-schedule/add'}`,
      model,
      { headers: headers }
    );
  }
  getInterviewScheduleByComSta(code: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<ResponseObject>(
      `${
        this.urlPath +
        '/api/v1/interview-schedule/get-by-company/' +
        code +
        '?status=Yes'
      }`,
      { headers: headers }
    );
  }
  getInterviewScheduleById(id?: string): Observable<any> {
    return this.http.get<ResponseObject>(
      `${this.urlPath + '/api/v1/interview-schedule/get-by-id/' + id}`
    );
  }
  updateInterviewScheduleById(
    id?: string,
    date?: string,
    status?: string
  ): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<ResponseObject>(
      `${this.urlPath + '/api/v1/interview-schedule/update/' + id}`,
      {
        schedule: date,
        status: status,
      },
      { headers: headers }
    );
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Candidate, ResponseObject } from '../../model/news.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  public typeNews = '';
  public listCandidate: Candidate[] = [];
  private refreshBehavior = new BehaviorSubject<number>(0);
  urlPath = 'https://server-api.newscv.tech';
  constructor(private http: HttpClient) {}

  public getRefresh() {
    return this.refreshBehavior;
  }
  getCandidateByCompany(company: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<ResponseObject>(
      `${
        this.urlPath + '/api/v1/application/get-candidate-by-company/' + company
      }`,
      '',
      { headers: headers }
    );
  }
  getInteractiveNews(type?: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<ResponseObject>(
      `${this.urlPath + '/api/v1/get-interactive-news?type=' + type}`,
      { headers: headers }
    );
  }
  getScholarshipByStatus(status: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<ResponseObject>(
      `${
        this.urlPath + '/api/v1/scholarship-news/get-by-status?status=' + status
      }`,
      { headers: headers }
    );
  }
  getCompitionByStatus(status: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<ResponseObject>(
      `${this.urlPath + '/api/v1/contest-news/get-by-status?status=' + status}`,
      { headers: headers }
    );
  }
  getEventByStatus(status: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<ResponseObject>(
      `${this.urlPath + '/api/v1/event-news/get-by-status?status=' + status}`,
      { headers: headers }
    );
  }
  
  getDetailCandidateByJob(idJob: Number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<ResponseObject>(
      `${this.urlPath + '/api/v1/application/get-application-by-job/' + idJob}`,
      '',
      { headers: headers }
    );
  }
  getJobByStatus(status: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<ResponseObject>(
      `${this.urlPath + '/api/v1/job-news/get-by-status?status=' + status}`,
      { headers: headers }
    );
  }
  public getListOfCandidate(company: string) {
    this.getCandidateByCompany(company).subscribe((res) => {
      this.listCandidate = res.data;
    });
    return of(this.listCandidate);
  }
  updateStatus(id: String, status: String) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<ResponseObject>(
      `${this.urlPath + '/api/v1/update-status-news/' + id + '/' + status}`,
      '',
      { headers: headers }
    );
  }

}

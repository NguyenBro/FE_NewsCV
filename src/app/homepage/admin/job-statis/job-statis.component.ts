import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  Subscription,
} from 'rxjs';
import { Application, Candidate, user } from '../../model/news.model';
import { newsService } from '../../services/news.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-job-statis',
  templateUrl: './job-statis.component.html',
  styleUrls: ['./job-statis.component.less'],
})
export class JobStatisComponent implements OnInit {
  listApply: Application[] = [];
  public showRight = false;
  selectedJob: Candidate = new Candidate();
  user: user = new user();
  subscriptions = new Subscription();
  private listOfSearches$ = new BehaviorSubject<string[]>([]);
  private pageIndex$ = new BehaviorSubject(1);
  private pageSize$ = new BehaviorSubject(15);
  private refreshBehavior$ = this.services.getRefresh();
  private listCandidate$: Observable<Candidate[]> = new Observable<
    Candidate[]
  >();
  public listCom$: Observable<Candidate[]> = new Observable<Candidate[]>();
  constructor(
    private services: AdminService,
    private serviceNews: newsService
  ) {
    this.loadUser();
  }
  async loadUser() {
    this.serviceNews
      .getLoggedInUser(localStorage.getItem('email') || '')
      .subscribe((user) => {
        if (user.errorCode === null) {
          this.user = user.data;
          this.loadData();
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('email');
          localStorage.removeItem('cv');
          localStorage.removeItem('searchKeyword');
          localStorage.removeItem('role');
        }
      });
  }
  loadData() {
    console.log('userName', this.user.name);
    this.listCandidate$ = this.services
      .getCandidateByCompany(this.user.name)
      .pipe(map((data) => data.data));

    this.listCom$ = combineLatest({
      listOfCompetences: this.listCandidate$,
      pageIndex: this.pageIndex$,
      pageSize: this.pageSize$,
      searches: this.listOfSearches$,
      refresh: this.refreshBehavior$,
    }).pipe(
      map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
        listOfCompetences
          // .filter((competence) => this.isSearchCompetence(competence, searches))
          .slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
      )
    );
  }
  ngOnInit(): void {}
  onSelected(can: Candidate) {
    this.showRight = true;
    this.selectedJob = can;
    this.listApply = [];
    this.services
      .getDetailCandidateByJob(this.selectedJob.id)
      .subscribe((apply) => {
        console.log('serviceCompany', apply.data);
        for (let i = 0; i < apply.data.length; i++) {
          this.listApply.push(apply.data[i]);
        }
        console.log('listNameCompany', this.listApply);
      });
  }
}

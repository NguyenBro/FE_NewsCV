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
import { Data, Router } from '@angular/router';
import { NzI18nService, vi_VN } from 'ng-zorro-antd/i18n';
import { ScheduleInterviewService } from 'src/app/business/schedule-interview/schedule-interview.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-job-statis',
  templateUrl: './job-statis.component.html',
  styleUrls: ['./job-statis.component.less'],
})
export class JobStatisComponent implements OnInit {
  indeterminate = false;
  listOfCurrentPageData: readonly Data[] = [];
  setOfCheckedId = new Set<number>();
  checked = false;

  load = false;
  selectedCompany = '';
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
  // listApply: Observable<Application[]> = new Observable<Application[]>();
  constructor(
    private services: AdminService,
    private serviceNews: newsService,
    private i18n: NzI18nService,
    private router: Router,
    private SIService: ScheduleInterviewService,
    private message: NzMessageService
  ) {
    this.switchLanguage();
    this.loadUser();
  }

  switchLanguage() {
    this.i18n.setLocale(vi_VN);
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
  async select(name: string) {
    this.load = true;
    this.showRight = false;
    this.selectedCompany = name;
    this.listCandidate$ = await this.services
      .getCandidateByCompany(this.selectedCompany)
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
    this.load = false;
  }
  onSelected(can: Candidate) {
    this.showRight = false;
    this.selectedJob = can;
    this.listApply = [];
    this.services
      .getDetailCandidateByJob(this.selectedJob.id)
      .subscribe((apply) => {
        for (let i = 0; i < apply.data.length; i++) {
          this.listApply.push(apply.data[i]);
        }
        this.showRight = true;
      });
  }
  snapStatus(id: Number, status: String) {
    this.services.updateStatusAppli(id.toString(), status).subscribe((res) => {
      if (res.errorCode === null) {
        this.showRight = false;
        this.listApply = [];
        this.services
          .getDetailCandidateByJob(this.selectedJob.id)
          .subscribe((apply) => {
            for (let i = 0; i < apply.data.length; i++) {
              this.listApply.push(apply.data[i]);
            }
            this.showRight = true;
          });
      } else {
        this.message.error('Có lỗi xảy ra');
      }
    });
  }
  onCurrentPageDataChange(listOfCurrentPageData: readonly Data[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }
  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData.filter(
      ({ disabled }) => !disabled
    );
    this.checked = listOfEnabledData.every(({ id }) =>
      this.setOfCheckedId.has(id)
    );
    this.indeterminate =
      listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) &&
      !this.checked;
  }
  createScheduleInterview(apply: Application) {
    this.SIService.apply = apply;
    this.router.navigate(['./Business/Schedule-Interview/Create-Schedule']);
  }
}

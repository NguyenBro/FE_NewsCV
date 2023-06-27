import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  of,
  Subscription,
} from 'rxjs';
import { CompanysService } from '../../company/services/companys.service';
import { Application, Candidate } from '../../model/news.model';
import { AdminService } from '../services/admin.service';
import { Data } from '@angular/router';
import { NzI18nService, vi_VN } from 'ng-zorro-antd/i18n';

@Component({
  selector: 'app-recruit-statis',
  templateUrl: './recruit-statis.component.html',
  styleUrls: ['./recruit-statis.component.less'],
})
export class RecruitStatisComponent implements OnInit {
  indeterminate = false;
  listOfCurrentPageData: readonly Data[] = [];
  setOfCheckedId = new Set<number>();
  checked = false;

  load = false;
  listApply: Application[] = [];
  listNameCompany: string[] = [];
  public showRight = false;
  selectedJob: Candidate = new Candidate();
  selectedCompany = '';
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
    private serviceCompany: CompanysService,
    private i18n: NzI18nService
  ) {
    this.i18n.setLocale(vi_VN);
    this.showRight = false;
    serviceCompany.getListCompany().subscribe((data) => {
      for (let i = 0; i < data.data.length; i++) {
        this.listNameCompany.push(data.data[i].name);
      }
      console.log('listNameCompany', this.listNameCompany);
    });
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
        console.log('serviceCompany', apply.data);
        for (let i = 0; i < apply.data.length; i++) {
          this.listApply.push(apply.data[i]);
        }
        this.showRight = true;
        console.log('listNameCompany', this.listApply);
      });
  }
  snapStatus(id: Number, status: String) {
    this.services.updateStatusAppli(id.toString(), status).subscribe();
    this.select(this.selectedCompany);
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
}

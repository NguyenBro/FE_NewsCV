import { Component, OnInit } from '@angular/core';
import { log } from 'console';
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

@Component({
  selector: 'app-recruit-statis',
  templateUrl: './recruit-statis.component.html',
  styleUrls: ['./recruit-statis.component.less'],
})
export class RecruitStatisComponent implements OnInit {
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
    private serviceCompany: CompanysService
  ) {
    this.showRight = false;
    console.log('listCandidate2', this.listCom$);
    serviceCompany.getListCompany().subscribe((data) => {
      console.log('serviceCompany', data.data[0].name);
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
  }
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

import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  Subscription,
} from 'rxjs';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-news-statis',
  templateUrl: './news-statis.component.html',
  styleUrls: ['./news-statis.component.less'],
})
export class NewsStatisComponent implements OnInit {
  load = true;
  selectedStatus = '';
  listNameStatus = ['Đã duyệt', 'Đã huỷ', 'Đang xử lý', 'Tất cả'];
  subscriptions = new Subscription();
  private listOfSearches$ = new BehaviorSubject<string[]>([]);
  private pageIndex$ = new BehaviorSubject(1);
  private pageSize$ = new BehaviorSubject(15);
  private refreshBehavior$ = this.services.getRefresh();
  private listNews$ = this.services
    .getInteractiveNews(this.services.typeNews)
    .pipe(map((data) => data.data));
  public listCom$ = combineLatest({
    listOfCompetences: this.listNews$,
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
  constructor(private services: AdminService) {
    console.log('listCandidate2', this.listCom$);
    this.select('Tất cả');
  }
  async loadData() {}
  async select(item: String) {
    this.load = true;
    if (item === 'Đã duyệt') {
      this.selectedStatus = 'Đã duyệt';
      if (this.services.typeNews === 'hoc-bong') {
        this.listNews$ = this.services
          .getScholarshipByStatus('Done')
          .pipe(map((data) => data.data));
        this.listCom$ = combineLatest({
          listOfCompetences: this.listNews$,
          pageIndex: this.pageIndex$,
          pageSize: this.pageSize$,
          searches: this.listOfSearches$,
          refresh: this.refreshBehavior$,
        }).pipe(
          map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
            listOfCompetences
              // .filter((competence) => this.isSearchCompetence(competence, searches))
              .slice(
                (pageIndex - 1) * pageSize,
                pageIndex * pageSize,
                (this.load = false)
              )
          )
        );
      } else if (this.services.typeNews === 'cuoc-thi') {
        this.listNews$ = this.services
          .getCompitionByStatus('Done')
          .pipe(map((data) => data.data));
        this.listCom$ = combineLatest({
          listOfCompetences: this.listNews$,
          pageIndex: this.pageIndex$,
          pageSize: this.pageSize$,
          searches: this.listOfSearches$,
          refresh: this.refreshBehavior$,
        }).pipe(
          map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
            listOfCompetences
              // .filter((competence) => this.isSearchCompetence(competence, searches))
              .slice(
                (pageIndex - 1) * pageSize,
                pageIndex * pageSize,
                (this.load = false)
              )
          )
        );
      } else if (this.services.typeNews === 'su-kien') {
        this.listNews$ = this.services
          .getEventByStatus('Done')
          .pipe(map((data) => data.data));
        this.listCom$ = combineLatest({
          listOfCompetences: this.listNews$,
          pageIndex: this.pageIndex$,
          pageSize: this.pageSize$,
          searches: this.listOfSearches$,
          refresh: this.refreshBehavior$,
        }).pipe(
          map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
            listOfCompetences
              // .filter((competence) => this.isSearchCompetence(competence, searches))
              .slice(
                (pageIndex - 1) * pageSize,
                pageIndex * pageSize,
                (this.load = false)
              )
          )
        );
      } else {
        this.listNews$ = this.services
          .getJobByStatus('Done')
          .pipe(map((data) => data.data));
        this.listCom$ = combineLatest({
          listOfCompetences: this.listNews$,
          pageIndex: this.pageIndex$,
          pageSize: this.pageSize$,
          searches: this.listOfSearches$,
          refresh: this.refreshBehavior$,
        }).pipe(
          map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
            listOfCompetences
              // .filter((competence) => this.isSearchCompetence(competence, searches))
              .slice(
                (pageIndex - 1) * pageSize,
                pageIndex * pageSize,
                (this.load = false)
              )
          )
        );
      }
    } else if (item === 'Đã huỷ') {
      this.selectedStatus = 'Đã huỷ';
      if (this.services.typeNews === 'hoc-bong') {
        this.listNews$ = this.services
          .getScholarshipByStatus('Cancel')
          .pipe(map((data) => data.data));
        this.listCom$ = combineLatest({
          listOfCompetences: this.listNews$,
          pageIndex: this.pageIndex$,
          pageSize: this.pageSize$,
          searches: this.listOfSearches$,
          refresh: this.refreshBehavior$,
        }).pipe(
          map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
            listOfCompetences
              // .filter((competence) => this.isSearchCompetence(competence, searches))
              .slice(
                (pageIndex - 1) * pageSize,
                pageIndex * pageSize,
                (this.load = false)
              )
          )
        );
      } else if (this.services.typeNews === 'cuoc-thi') {
        this.listNews$ = this.services
          .getCompitionByStatus('Cancel')
          .pipe(map((data) => data.data));
        this.listCom$ = combineLatest({
          listOfCompetences: this.listNews$,
          pageIndex: this.pageIndex$,
          pageSize: this.pageSize$,
          searches: this.listOfSearches$,
          refresh: this.refreshBehavior$,
        }).pipe(
          map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
            listOfCompetences
              // .filter((competence) => this.isSearchCompetence(competence, searches))
              .slice(
                (pageIndex - 1) * pageSize,
                pageIndex * pageSize,
                (this.load = false)
              )
          )
        );
      } else if (this.services.typeNews === 'su-kien') {
        this.listNews$ = this.services
          .getEventByStatus('Cancel')
          .pipe(map((data) => data.data));
        this.listCom$ = combineLatest({
          listOfCompetences: this.listNews$,
          pageIndex: this.pageIndex$,
          pageSize: this.pageSize$,
          searches: this.listOfSearches$,
          refresh: this.refreshBehavior$,
        }).pipe(
          map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
            listOfCompetences
              // .filter((competence) => this.isSearchCompetence(competence, searches))
              .slice(
                (pageIndex - 1) * pageSize,
                pageIndex * pageSize,
                (this.load = false)
              )
          )
        );
      } else {
        this.listNews$ = this.services
          .getJobByStatus('Cancel')
          .pipe(map((data) => data.data));
        this.listCom$ = combineLatest({
          listOfCompetences: this.listNews$,
          pageIndex: this.pageIndex$,
          pageSize: this.pageSize$,
          searches: this.listOfSearches$,
          refresh: this.refreshBehavior$,
        }).pipe(
          map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
            listOfCompetences
              // .filter((competence) => this.isSearchCompetence(competence, searches))
              .slice(
                (pageIndex - 1) * pageSize,
                pageIndex * pageSize,
                (this.load = false)
              )
          )
        );
      }
    } else if (item === 'Đang xử lý') {
      this.selectedStatus = 'Đang xử lý';
      if (this.services.typeNews === 'hoc-bong') {
        this.listNews$ = this.services
          .getScholarshipByStatus('Waiting')
          .pipe(map((data) => data.data));
        this.listCom$ = combineLatest({
          listOfCompetences: this.listNews$,
          pageIndex: this.pageIndex$,
          pageSize: this.pageSize$,
          searches: this.listOfSearches$,
          refresh: this.refreshBehavior$,
        }).pipe(
          map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
            listOfCompetences
              // .filter((competence) => this.isSearchCompetence(competence, searches))
              .slice(
                (pageIndex - 1) * pageSize,
                pageIndex * pageSize,
                (this.load = false)
              )
          )
        );
      } else if (this.services.typeNews === 'cuoc-thi') {
        this.listNews$ = this.services
          .getCompitionByStatus('Waiting')
          .pipe(map((data) => data.data));
        this.listCom$ = combineLatest({
          listOfCompetences: this.listNews$,
          pageIndex: this.pageIndex$,
          pageSize: this.pageSize$,
          searches: this.listOfSearches$,
          refresh: this.refreshBehavior$,
        }).pipe(
          map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
            listOfCompetences
              // .filter((competence) => this.isSearchCompetence(competence, searches))
              .slice(
                (pageIndex - 1) * pageSize,
                pageIndex * pageSize,
                (this.load = false)
              )
          )
        );
      } else if (this.services.typeNews === 'su-kien') {
        this.listNews$ = this.services
          .getEventByStatus('Waiting')
          .pipe(map((data) => data.data));
        this.listCom$ = combineLatest({
          listOfCompetences: this.listNews$,
          pageIndex: this.pageIndex$,
          pageSize: this.pageSize$,
          searches: this.listOfSearches$,
          refresh: this.refreshBehavior$,
        }).pipe(
          map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
            listOfCompetences
              // .filter((competence) => this.isSearchCompetence(competence, searches))
              .slice(
                (pageIndex - 1) * pageSize,
                pageIndex * pageSize,
                (this.load = false)
              )
          )
        );
      } else {
        this.listNews$ = this.services
          .getJobByStatus('Waiting')
          .pipe(map((data) => data.data));
        this.listCom$ = combineLatest({
          listOfCompetences: this.listNews$,
          pageIndex: this.pageIndex$,
          pageSize: this.pageSize$,
          searches: this.listOfSearches$,
          refresh: this.refreshBehavior$,
        }).pipe(
          map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
            listOfCompetences
              // .filter((competence) => this.isSearchCompetence(competence, searches))
              .slice(
                (pageIndex - 1) * pageSize,
                pageIndex * pageSize,
                (this.load = false)
              )
          )
        );
      }
    } else {
      this.selectedStatus = 'Tất cả';
      this.listNews$ = this.services
        .getInteractiveNews(this.services.typeNews)
        .pipe(map((data) => data.data));
      this.listCom$ = await combineLatest({
        listOfCompetences: this.listNews$,
        pageIndex: this.pageIndex$,
        pageSize: this.pageSize$,
        searches: this.listOfSearches$,
        refresh: this.refreshBehavior$,
      }).pipe(
        map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
          listOfCompetences
            // .filter((competence) => this.isSearchCompetence(competence, searches))
            .slice(
              (pageIndex - 1) * pageSize,
              pageIndex * pageSize,
              (this.load = false)
            )
        )
      );
    }
  }
  ngOnInit(): void {}
  snapStatus(id: Number, status: String) {
    this.services.updateStatus(id.toString(), status).subscribe();
    this.select('Tất cả');
  }
}

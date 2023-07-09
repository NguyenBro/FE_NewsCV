import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  Subscription,
} from 'rxjs';
import { AdminService } from '../services/admin.service';
import { Data } from '@angular/router';
import { NzI18nService, vi_VN } from 'ng-zorro-antd/i18n';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-news-statis',
  templateUrl: './news-statis.component.html',
  styleUrls: ['./news-statis.component.less'],
})
export class NewsStatisComponent implements OnInit {
  indeterminate = false;
  listOfCurrentPageData: readonly Data[] = [];
  setOfCheckedId = new Set<number>();
  checked = false;
  //
  load = true;
  selectedStatus = '';
  listNameStatus = ['Đã duyệt', 'Đã huỷ', 'Đang xử lý', 'Tất cả'];
  subscriptions = new Subscription();
  private listOfSearches$ = new BehaviorSubject<string[]>([]);
  private pageIndex$ = new BehaviorSubject(1);
  private pageSize$ = new BehaviorSubject(15);
  private refreshBehavior$ = this.services.getRefresh();
  // private listNews1$ :Observable<any>=new Observable<any>
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
  listNewstemp: any = [];
  constructor(
    private services: AdminService,
    private i18n: NzI18nService,
    private message: NzMessageService
  ) {
    this.i18n.setLocale(vi_VN);
    this.select('Tất cả');
  }
  async select(item: String) {
    this.load = true;
    if (item === 'Đã duyệt') {
      this.selectedStatus = 'Đã duyệt';
      if (this.services.typeNews === 'hoc-bong') {
        this.services.getScholarshipByStatus('Done').subscribe((res) => {
          console.log('giá trị mà dta đã chọn là', res);
          this.listNewstemp = res.data;
          this.load = false;
        });
        // this.listNews$ = this.services
        //   .getScholarshipByStatus('Done')
        //   .pipe(map((data) => data.data));
        // this.listCom$ = combineLatest({
        //   listOfCompetences: this.listNews$,
        //   pageIndex: this.pageIndex$,
        //   pageSize: this.pageSize$,
        //   searches: this.listOfSearches$,
        //   refresh: this.refreshBehavior$,
        // }).pipe(
        //   map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
        //     listOfCompetences
        //       // .filter((competence) => this.isSearchCompetence(competence, searches))
        //       .slice(
        //         (pageIndex - 1) * pageSize,
        //         pageIndex * pageSize,
        //         (this.load = false)
        //       )
        //   )
        // );
      } else if (this.services.typeNews === 'cuoc-thi') {
        this.services.getCompitionByStatus('Done').subscribe((res) => {
          console.log('giá trị mà dta đã chọn là', res);
          this.listNewstemp = res.data;
          this.load = false;
        });
        // this.listNews$ = this.services
        //   .getCompitionByStatus('Done')
        //   .pipe(map((data) => data.data));
        // this.listCom$ = combineLatest({
        //   listOfCompetences: this.listNews$,
        //   pageIndex: this.pageIndex$,
        //   pageSize: this.pageSize$,
        //   searches: this.listOfSearches$,
        //   refresh: this.refreshBehavior$,
        // }).pipe(
        //   map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
        //     listOfCompetences
        //       // .filter((competence) => this.isSearchCompetence(competence, searches))
        //       .slice(
        //         (pageIndex - 1) * pageSize,
        //         pageIndex * pageSize,
        //         (this.load = false)
        //       )
        //   )
        // );
      } else if (this.services.typeNews === 'su-kien') {
        this.services.getEventByStatus('Done').subscribe((res) => {
          console.log('giá trị mà dta đã chọn là', res);
          this.listNewstemp = res.data;
          this.load = false;
        });
        // this.listNews$ = this.services
        //   .getEventByStatus('Done')
        //   .pipe(map((data) => data.data));
        // this.listCom$ = combineLatest({
        //   listOfCompetences: this.listNews$,
        //   pageIndex: this.pageIndex$,
        //   pageSize: this.pageSize$,
        //   searches: this.listOfSearches$,
        //   refresh: this.refreshBehavior$,
        // }).pipe(
        //   map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
        //     listOfCompetences
        //       // .filter((competence) => this.isSearchCompetence(competence, searches))
        //       .slice(
        //         (pageIndex - 1) * pageSize,
        //         pageIndex * pageSize,
        //         (this.load = false)
        //       )
        //   )
        // );
      } else {
        this.services.getJobByStatus('Done').subscribe((res) => {
          console.log('giá trị mà dta đã chọn là', res);
          this.listNewstemp = res.data;
          this.load = false;
        });
        // this.listNews$ = this.services
        //   .getJobByStatus('Done')
        //   .pipe(map((data) => data.data));
        // this.listCom$ = combineLatest({
        //   listOfCompetences: this.listNews$,
        //   pageIndex: this.pageIndex$,
        //   pageSize: this.pageSize$,
        //   searches: this.listOfSearches$,
        //   refresh: this.refreshBehavior$,
        // }).pipe(
        //   map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
        //     listOfCompetences
        //       // .filter((competence) => this.isSearchCompetence(competence, searches))
        //       .slice(
        //         (pageIndex - 1) * pageSize,
        //         pageIndex * pageSize,
        //         (this.load = false)
        //       )
        //   )
        // );
      }
    } else if (item === 'Đã huỷ') {
      this.selectedStatus = 'Đã huỷ';
      if (this.services.typeNews === 'hoc-bong') {
        this.services.getScholarshipByStatus('Cancel').subscribe((res) => {
          console.log('giá trị mà dta đã chọn là', res);
          this.listNewstemp = res.data;
          this.load = false;
        });
        // this.listNews$ = this.services
        //   .getScholarshipByStatus('Cancel')
        //   .pipe(map((data) => data.data));
        // this.listCom$ = combineLatest({
        //   listOfCompetences: this.listNews$,
        //   pageIndex: this.pageIndex$,
        //   pageSize: this.pageSize$,
        //   searches: this.listOfSearches$,
        //   refresh: this.refreshBehavior$,
        // }).pipe(
        //   map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
        //     listOfCompetences
        //       // .filter((competence) => this.isSearchCompetence(competence, searches))
        //       .slice(
        //         (pageIndex - 1) * pageSize,
        //         pageIndex * pageSize,
        //         (this.load = false)
        //       )
        //   )
        // );
      } else if (this.services.typeNews === 'cuoc-thi') {
        this.services.getCompitionByStatus('Cancel').subscribe((res) => {
          console.log('giá trị mà dta đã chọn là', res);
          this.listNewstemp = res.data;
          this.load = false;
        });
        // this.listNews$ = this.services
        //   .getCompitionByStatus('Cancel')
        //   .pipe(map((data) => data.data));
        // this.listCom$ = combineLatest({
        //   listOfCompetences: this.listNews$,
        //   pageIndex: this.pageIndex$,
        //   pageSize: this.pageSize$,
        //   searches: this.listOfSearches$,
        //   refresh: this.refreshBehavior$,
        // }).pipe(
        //   map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
        //     listOfCompetences
        //       // .filter((competence) => this.isSearchCompetence(competence, searches))
        //       .slice(
        //         (pageIndex - 1) * pageSize,
        //         pageIndex * pageSize,
        //         (this.load = false)
        //       )
        //   )
        // );
      } else if (this.services.typeNews === 'su-kien') {
        this.services.getEventByStatus('Cancel').subscribe((res) => {
          console.log('giá trị mà dta đã chọn là', res);
          this.listNewstemp = res.data;
          this.load = false;
        });
        // this.listNews$ = this.services
        //   .getEventByStatus('Cancel')
        //   .pipe(map((data) => data.data));
        // this.listCom$ = combineLatest({
        //   listOfCompetences: this.listNews$,
        //   pageIndex: this.pageIndex$,
        //   pageSize: this.pageSize$,
        //   searches: this.listOfSearches$,
        //   refresh: this.refreshBehavior$,
        // }).pipe(
        //   map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
        //     listOfCompetences
        //       // .filter((competence) => this.isSearchCompetence(competence, searches))
        //       .slice(
        //         (pageIndex - 1) * pageSize,
        //         pageIndex * pageSize,
        //         (this.load = false)
        //       )
        //   )
        // );
      } else {
        this.services.getJobByStatus('Cancel').subscribe((res) => {
          console.log('giá trị mà dta đã chọn là', res);
          this.listNewstemp = res.data;
          this.load = false;
        });
        // this.listNews$ = this.services
        //   .getJobByStatus('Cancel')
        //   .pipe(map((data) => data.data));
        // this.listCom$ = combineLatest({
        //   listOfCompetences: this.listNews$,
        //   pageIndex: this.pageIndex$,
        //   pageSize: this.pageSize$,
        //   searches: this.listOfSearches$,
        //   refresh: this.refreshBehavior$,
        // }).pipe(
        //   map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
        //     listOfCompetences
        //       // .filter((competence) => this.isSearchCompetence(competence, searches))
        //       .slice(
        //         (pageIndex - 1) * pageSize,
        //         pageIndex * pageSize,
        //         (this.load = false)
        //       )
        //   )
        // );
      }
    } else if (item === 'Đang xử lý') {
      this.selectedStatus = 'Đang xử lý';
      if (this.services.typeNews === 'hoc-bong') {
        this.services.getScholarshipByStatus('Waiting').subscribe((res) => {
          console.log('giá trị mà dta đã chọn là', res);
          this.listNewstemp = res.data;
          this.load = false;
        });
        // this.listNews$ = this.services
        //   .getScholarshipByStatus('Waiting')
        //   .pipe(map((data) => data.data));
        // this.listCom$ = combineLatest({
        //   listOfCompetences: this.listNews$,
        //   pageIndex: this.pageIndex$,
        //   pageSize: this.pageSize$,
        //   searches: this.listOfSearches$,
        //   refresh: this.refreshBehavior$,
        // }).pipe(
        //   map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
        //     listOfCompetences
        //       // .filter((competence) => this.isSearchCompetence(competence, searches))
        //       .slice(
        //         (pageIndex - 1) * pageSize,
        //         pageIndex * pageSize,
        //         (this.load = false)
        //       )
        //   )
        // );
      } else if (this.services.typeNews === 'cuoc-thi') {
        this.services.getCompitionByStatus('Waiting').subscribe((res) => {
          console.log('giá trị mà dta đã chọn là', res);
          this.listNewstemp = res.data;
          this.load = false;
        });
        // this.listNews$ = this.services
        //   .getCompitionByStatus('Waiting')
        //   .pipe(map((data) => data.data));
        // this.listCom$ = combineLatest({
        //   listOfCompetences: this.listNews$,
        //   pageIndex: this.pageIndex$,
        //   pageSize: this.pageSize$,
        //   searches: this.listOfSearches$,
        //   refresh: this.refreshBehavior$,
        // }).pipe(
        //   map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
        //     listOfCompetences
        //       // .filter((competence) => this.isSearchCompetence(competence, searches))
        //       .slice(
        //         (pageIndex - 1) * pageSize,
        //         pageIndex * pageSize,
        //         (this.load = false)
        //       )
        //   )
        // );
      } else if (this.services.typeNews === 'su-kien') {
        this.services.getEventByStatus('Waiting').subscribe((res) => {
          console.log('giá trị mà dta đã chọn là', res);
          this.listNewstemp = res.data;
          this.load = false;
        });
        // this.listNews$ = this.services
        //   .getEventByStatus('Waiting')
        //   .pipe(map((data) => data.data));
        // this.listCom$ = combineLatest({
        //   listOfCompetences: this.listNews$,
        //   pageIndex: this.pageIndex$,
        //   pageSize: this.pageSize$,
        //   searches: this.listOfSearches$,
        //   refresh: this.refreshBehavior$,
        // }).pipe(
        //   map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
        //     listOfCompetences
        //       // .filter((competence) => this.isSearchCompetence(competence, searches))
        //       .slice(
        //         (pageIndex - 1) * pageSize,
        //         pageIndex * pageSize,
        //         (this.load = false)
        //       )
        //   )
        // );
      } else {
        this.services.getJobByStatus('Waiting').subscribe((res) => {
          console.log('giá trị mà dta đã chọn là', res);
          this.listNewstemp = res.data;
          this.load = false;
        });
        // this.listNews$ = this.services
        //   .getJobByStatus('Waiting')
        //   .pipe(map((data) => data.data));
        // this.listCom$ = combineLatest({
        //   listOfCompetences: this.listNews$,
        //   pageIndex: this.pageIndex$,
        //   pageSize: this.pageSize$,
        //   searches: this.listOfSearches$,
        //   refresh: this.refreshBehavior$,
        // }).pipe(
        //   map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
        //     listOfCompetences
        //       // .filter((competence) => this.isSearchCompetence(competence, searches))
        //       .slice(
        //         (pageIndex - 1) * pageSize,
        //         pageIndex * pageSize,
        //         (this.load = false)
        //       )
        //   )
        // );
      }
    } else {
      this.selectedStatus = 'Tất cả';
      if (this.services.typeNews === 'hoc-bong') {
        this.services.getScholarshipByStatus('').subscribe((res) => {
          console.log('giá trị mà dta đã chọn là', res);
          this.listNewstemp = res.data;
          this.load = false;
        });
        // this.listNews$ = this.services
        //   .getScholarshipByStatus('')
        //   .pipe(map((data) => data.data));
        // this.listCom$ = combineLatest({
        //   listOfCompetences: this.listNews$,
        //   pageIndex: this.pageIndex$,
        //   pageSize: this.pageSize$,
        //   searches: this.listOfSearches$,
        //   refresh: this.refreshBehavior$,
        // }).pipe(
        //   map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
        //     listOfCompetences
        //       // .filter((competence) => this.isSearchCompetence(competence, searches))
        //       .slice(
        //         (pageIndex - 1) * pageSize,
        //         pageIndex * pageSize,
        //         (this.load = false)
        //       )
        //   )
        // );
      } else if (this.services.typeNews === 'cuoc-thi') {
        this.services.getCompitionByStatus('').subscribe((res) => {
          console.log('giá trị mà dta đã chọn là', res);
          this.listNewstemp = res.data;
          this.load = false;
        });
        // this.listNews$ = this.services
        //   .getCompitionByStatus('')
        //   .pipe(map((data) => data.data));
        // this.listCom$ = combineLatest({
        //   listOfCompetences: this.listNews$,
        //   pageIndex: this.pageIndex$,
        //   pageSize: this.pageSize$,
        //   searches: this.listOfSearches$,
        //   refresh: this.refreshBehavior$,
        // }).pipe(
        //   map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
        //     listOfCompetences
        //       // .filter((competence) => this.isSearchCompetence(competence, searches))
        //       .slice(
        //         (pageIndex - 1) * pageSize,
        //         pageIndex * pageSize,
        //         (this.load = false)
        //       )
        //   )
        // );
      } else if (this.services.typeNews === 'su-kien') {
        this.services.getEventByStatus('').subscribe((res) => {
          console.log('giá trị mà dta đã chọn là', res);
          this.listNewstemp = res.data;
          this.load = false;
        });
        // this.listNews$ = this.services
        //   .getEventByStatus('')
        //   .pipe(map((data) => data.data));
        // this.listCom$ = combineLatest({
        //   listOfCompetences: this.listNews$,
        //   pageIndex: this.pageIndex$,
        //   pageSize: this.pageSize$,
        //   searches: this.listOfSearches$,
        //   refresh: this.refreshBehavior$,
        // }).pipe(
        //   map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
        //     listOfCompetences
        //       // .filter((competence) => this.isSearchCompetence(competence, searches))
        //       .slice(
        //         (pageIndex - 1) * pageSize,
        //         pageIndex * pageSize,
        //         (this.load = false)
        //       )
        //   )
        // );
      } else {
        this.services.getJobByStatus('').subscribe((res) => {
          console.log('giá trị mà dta đã chọn là', res);
          this.listNewstemp = res.data;
          this.load = false;
        });
        // this.listNews$ = this.services
        //   .getJobByStatus('')
        //   .pipe(map((data) => data.data));
        // this.listCom$ = combineLatest({
        //   listOfCompetences: this.listNews$,
        //   pageIndex: this.pageIndex$,
        //   pageSize: this.pageSize$,
        //   searches: this.listOfSearches$,
        //   refresh: this.refreshBehavior$,
        // }).pipe(
        //   map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
        //     listOfCompetences
        //       // .filter((competence) => this.isSearchCompetence(competence, searches))
        //       .slice(
        //         (pageIndex - 1) * pageSize,
        //         pageIndex * pageSize,
        //         (this.load = false)
        //       )
        //   )
        // );
      }
    }
  }
  ngOnInit(): void {}
  snapStatus(id: Number, status: String) {
    this.services.updateStatus(id.toString(), status).subscribe((res) => {
      console.log('Giá trị sau khi duyệt', res);
      if (res.errorCode === null) {
        window.location.reload();
        if (status === 'Waiting') {
          this.message.success('Duyệt tin thành công');
        } else {
          this.message.success('Huỷ tin thành công');
        }
      } else {
        if (status === 'Waiting') {
          this.message.success('Duyệt tin thất bại');
        } else {
          this.message.success('Huỷ tin thất bại');
        }
      }
    });
    // this.select('Tất cả');
    // window.location.reload();
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

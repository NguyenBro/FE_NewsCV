import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { vi_VN, NzI18nService } from 'ng-zorro-antd/i18n';
import {
  Company,
  SubHis,
  TransHis,
  user,
} from 'src/app/homepage/model/news.model';
import { BusinessService } from '../business.service';
import { PackageService } from '../packages/packages.service';
import { format, formatISO } from 'date-fns';
@Component({
  selector: 'app-trans-his-com',
  templateUrl: './trans-his-com.component.html',
  styleUrls: ['./trans-his-com.component.less'],
})
export class TransHisComComponent implements OnInit {
  checked = false;
  loading = false;
  indeterminate = false;
  listOfCurrentPageData: readonly Data[] = [];
  listOfSubHisPageData: readonly Data[] = [];
  setOfCheckedId = new Set<number>();
  searchValue = '';
  visible = false;

  listOfData: TransHis[] = [];
  listOfSubHis: SubHis[] = [];
  listOfDisplayData = [...this.listOfData];
  listOfDisplaySubHis = [...this.listOfSubHis];
  user: user = new user();
  Com: Company = new Company();
  code = ''; //code company
  nowDate: Date = new Date();
  day = '';
  constructor(
    private i18n: NzI18nService,
    private service: BusinessService,
    private Packservice: PackageService
  ) {
    this.code =
      localStorage
        .getItem('email')
        ?.slice(0, localStorage.getItem('email')?.indexOf('@')) || '';
    // this.Packservice.getSubscriptionByCode
  }

  ngOnInit(): void {
    this.nowDate.setMonth(Number(format(this.nowDate, 'MM')));
    this.day =
      this.nowDate.getFullYear().toString() +
      '-' +
      format(this.nowDate, 'MM') +
      '-' +
      format(this.nowDate, 'dd');
    console.log('now date', this.day);
    this.service.getTransByCom(this.code).subscribe((data1) => {
      this.listOfData = data1.data;
      this.listOfDisplayData = [...this.listOfData];
    });
    this.service.getSubHisByCom(this.code).subscribe((data) => {
      this.listOfSubHis = data.data;
      this.listOfDisplaySubHis = [...this.listOfSubHis];
    });
    this.switchLanguage();
  }
  switchLanguage() {
    this.i18n.setLocale(vi_VN);
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter(
      (item: TransHis) => item.time.indexOf(this.searchValue) !== -1
    );
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
  //list sub his
  onCurrentPageSubChange(listOfSubHisPageData: readonly Data[]): void {
    this.listOfSubHisPageData = listOfSubHisPageData;
  }
  all() {
    this.service.getSubHisByCom(this.code).subscribe((data) => {
      this.listOfSubHis = data.data;
      this.listOfDisplaySubHis = [...this.listOfSubHis];
    });
  }
  expiryDate() {
    this.service.getExpSubByCom(this.code).subscribe((data) => {
      this.listOfSubHis = data.data;
      this.listOfDisplaySubHis = [...this.listOfSubHis];
    });
  }
}

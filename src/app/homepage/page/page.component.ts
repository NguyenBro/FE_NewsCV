import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { HomepageComponent } from '../homepage.component';
import { scholarship } from '../model/news.model';
import { newsService } from '../services/news.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.less'],
})
export class PageComponent implements OnInit {
  // listData: scholarship[] = [];
  // rawListScholarship$ = this.sevices.getListOfScholarship();
  // pageIndex$ = new BehaviorSubject<number>(1);
  // pageSize$ = new BehaviorSubject<number>(5);
  // listData$ = combineLatest({
  //   list: this.rawListScholarship$,
  //   index: this.pageIndex$,
  //   size: this.pageSize$,
  // }).pipe(
  //   map(({ list, index, size }) => {
  //     return list.slice((index - 1) * size, index * size);
  //   })
  // );
  constructor(
    private router: Router,
    private sevices: newsService,
    private homepagecom: HomepageComponent
  ) {
    this.homepagecom.load = true;
    this.homepagecom.loadData();
  }

  ngOnInit(): void {}
  onPageIndexChange(index: number) {
    // this.pageIndex$.next(index);
  }
}

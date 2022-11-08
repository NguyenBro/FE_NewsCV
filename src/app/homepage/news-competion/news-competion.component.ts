import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, map, Observable, of } from 'rxjs';
import { HomepageComponent } from '../homepage.component';
import { competion, scholarship } from '../model/news.model';
import { newsService } from '../services/news.service';

@Component({
  selector: 'app-news-competion',
  templateUrl: './news-competion.component.html',
  styleUrls: ['./news-competion.component.less'],
})
export class NewsCompetionComponent implements OnInit {
  competion: competion = new competion();
  filterList: string[] = [];
  Category = '';
  location = '';
  dataCategory: string[] = [];
  dataLocation: string[] = [];
  listScholarship: scholarship[] = [];

  routing = this.route.params.pipe(map((p) => p['id']));
  pageIndex$ = new BehaviorSubject<number>(1);
  pageSize$ = new BehaviorSubject<number>(5);
  rawListScholarship$ = new Observable<competion[]>();
  listScholarship$ = new Observable<competion[]>();
  constructor(
    private router: Router,
    private sevices: newsService,
    private route: ActivatedRoute,
    private homepage: HomepageComponent
  ) {
    homepage.showLogo = false;
  }

  ngOnInit(): void {
    this.initData();
    console.log('rawListScholarship$', this.rawListScholarship$);
  }
  initData() {
    this.dataCategory.push('An Toàn Thông Tin');
    this.dataCategory.push('Lập Trình');
    this.dataCategory.push('Kỹ thuật Dữ Liệu');
    this.dataCategory.push('Trí Tuệ Nhân Tạo');
    this.dataCategory.push('Khác');
    this.dataLocation.push('Hà Nội');
    this.dataLocation.push('Hồ Chí Minh');
    this.dataLocation.push('Đà Nẵng');
    this.dataLocation.push('Nước ngoài');
    this.dataLocation.push('Online');
    this.dataLocation.push('Khác');
    this.rawListScholarship$ = this.sevices.getListOfCompetion();
    this.listScholarship$ = combineLatest({
      list: this.rawListScholarship$,
      index: this.pageIndex$,
      size: this.pageSize$,
    }).pipe(
      map(({ list, index, size }) => {
        return list.slice((index - 1) * size, index * size);
      })
    );
  }
  onPageIndexChange(index: number) {
    console.log(index);
    this.pageIndex$.next(index);
  }
  onSelectionChangeCategory(event: string) {
    this.Category = event;
  }
  onSelectionChangeLocation(event: string) {
    this.location = event;
  }
  addFilter(filterText: string) {
    if (
      !this.filterList.some(
        (x) => x.toLowerCase() == filterText.toLowerCase()
      ) &&
      filterText.length > 0
    ) {
      this.filterList.push(filterText);
      // this.getPageList(0, true, filterText);
    }
  }
  search(event: Event) {
    if (event.target) {
      const element = event.target as HTMLInputElement;
      const searchText = element.value;
      console.log(searchText);
    }
  }
  find() {
    this.competion.type = 'cuoc-thi';
    this.competion.location = this.location;
    this.competion.typeNews = this.Category;
    this.sevices.filtercompetion(this.competion).subscribe((res) => {
      this.rawListScholarship$ = of(res.data);
      console.log('data', this.rawListScholarship$);
      this.listScholarship$ = combineLatest({
        list: this.rawListScholarship$,
        index: this.pageIndex$,
        size: this.pageSize$,
      }).pipe(
        map(({ list, index, size }) => {
          return list.slice((index - 1) * size, index * size);
        })
      );
    });
    // this.rawListScholarship$ = new Observable<competion[]>();
  }
  detail() {
    this.router.navigate(['./homepage/news-competion/create']);
  }
}

import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NewsScholarshipService } from '../services/news-scholarship.service';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  Subscription,
  timer,
} from 'rxjs';
import { HomepageComponent } from '../../homepage.component';
import { competion, scholarship } from '../../model/news.model';

@Component({
  selector: 'app-news-entry',
  templateUrl: './news-scholarship-entry.component.html',
  styleUrls: ['./news-scholarship-entry.component.less'],
})
export class NewsScholarshipEntryComponent implements OnInit, OnDestroy {
  showQt: boolean;
  load = false;
  @ViewChild('competenceFrameList', { static: true })
  competenceFrameList!: ElementRef<HTMLElement>;
  flex = false;
  public list: scholarship[] = [];
  isDetailShown = false;
  selectedCompetenceFrame = '';

  filterList: string[] = [];
  searchKeywords: string[] = [];

  currentPage = 0;
  listLength = 0;
  order = 0;

  paginationAmounts = [27, 18, 9];
  paginationAmount = 9;

  subscriptions = new Subscription();
  private listOfSearches$ = new BehaviorSubject<string[]>([]);
  private pageIndex$ = new BehaviorSubject(1);
  private pageSize$ = new BehaviorSubject(15);
  private refreshBehavior$ = this.service.getRefresh();

  private rawListCom$: Observable<scholarship[]> = this.service
    .getListScholarship()
    .pipe(map((data) => data.data));
  public listCom$ = combineLatest({
    listOfCompetences: this.rawListCom$,
    pageIndex: this.pageIndex$,
    pageSize: this.pageSize$,
    searches: this.listOfSearches$,
    refresh: this.refreshBehavior$,
  }).pipe(
    map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
      listOfCompetences
        .filter((competence) => this.isSearchCompetence(competence, searches))
        .slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
    )
  );
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private message: NzMessageService,
    private service: NewsScholarshipService,
    private modal: NzModalService,
    private homepage: HomepageComponent
  ) {
    homepage.select = 'news';
    homepage.showLogo = false;
    this.flex = false;
    // console.log('load1', this.load);
    // this.loadData();
    // console.log('load2', this.load);
    this.getPageList(this.currentPage);
    if (
      localStorage.getItem('role') === 'ADMIN' ||
      localStorage.getItem('role') === 'COMPANY'
    ) {
      this.showQt = true;
    } else {
      this.showQt = false;
    }
  }
  async loadData() {
    this.rawListCom$ = this.service.getListOfCompetences();
    this.listCom$ = await combineLatest({
      listOfCompetences: this.rawListCom$,
      pageIndex: this.pageIndex$,
      pageSize: this.pageSize$,
      searches: this.listOfSearches$,
      refresh: this.refreshBehavior$,
    }).pipe(
      map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
        listOfCompetences
          .filter((competence) => {
            this.isSearchCompetence(competence, searches);
            this.load = false;
          })
          .slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
      )
    );
  }
  onPageIndexChange(event: number) {
    this.pageIndex$.next(event);
  }
  onPageSizeChange(event: number) {
    this.pageSize$.next(event);
  }
  onListOfSearchesChange(event: string[]) {
    this.listOfSearches$.next(event);
  }
  isSearchCompetence(competence: scholarship, searches: string[]): boolean {
    if (searches.length === 0) return true;
    return searches.every(
      (search) =>
        competence.title
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase()) ||
        competence.shortContent
          ?.toLocaleLowerCase()
          .includes(search.toLocaleLowerCase()) ||
        competence.codeCategory
          ?.toLocaleLowerCase()
          .includes(search.toLocaleLowerCase())
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.getSearchKeyword();
  }

  selectCompetenceFrame(value: string, obj: scholarship, cardRef: HTMLElement) {
    this.subscriptions.add(
      timer(50).subscribe(() => {
        cardRef.scrollIntoView({
          behavior: 'smooth',
        });
      })
    );

    this.service.scholarship = obj;
    this.selectedCompetenceFrame = value;

    console.log('flex', this.flex);
    this.router.navigate(['./homepage/news-scholarship/' + value]);
  }

  getSearchKeyword() {
    const keywords = localStorage.getItem('searchKeyword');
    localStorage.setItem('searchKeyword', '[]');
    if (keywords) {
      this.searchKeywords = JSON.parse(keywords);
    }
  }

  saveSearchKeyword(keyword: string) {
    if (
      !this.searchKeywords.some((x) => x.toLowerCase() == keyword.toLowerCase())
    ) {
      if (this.searchKeywords.length >= 5) {
        this.searchKeywords.pop();
      }

      this.searchKeywords.unshift(keyword);
      localStorage.setItem(
        'searchKeyword',
        JSON.stringify(this.searchKeywords)
      );
    }
  }

  addFilter(filterText: string) {
    if (
      !this.filterList.some(
        (x) => x.toLowerCase() == filterText.toLowerCase()
      ) &&
      filterText.length > 0
    ) {
      this.filterList.push(filterText);
      this.saveSearchKeyword(filterText);
      this.getPageList(0, true, filterText);
    }
  }

  deleteFilter(filterText: string) {
    this.filterList = this.filterList.filter((filter) => filter != filterText);
    this.getPageList(0, true);
  }

  deleteAllFilter() {
    this.filterList = [];
    this.getPageList(0, true);
  }

  deleteCompetenceFrame(id: string, event: Event) {
    event.stopPropagation();
    this.modal.warning({
      nzTitle: `Bạn có muốn xóa tin: ${id} không?`,
      nzOkDanger: true,
      nzClassName: 'customPopUp warning',
      nzOnOk: () => {
        return this.deleteById(id);
      },
      nzOkText: 'Xóa',
      nzCancelText: 'Hủy',
      nzOnCancel: () => {
        return;
      },
    });
  }
  deleteById(id: string) {
    this.service.deleteById(id);
    this.message.success('Xoá thành công tin tức');
    this.router.navigate(['./homepage/news-scholarship']);
    this.isDetailShown = false;
    this.getPageList(this.currentPage);
  }
  createCompetenceFrame() {
    console.log('create');
    this.service.conditionDup = false;
    this.router
      .navigate(['./homepage/news-scholarship'], { skipLocationChange: true })
      .then(() => {
        console.log('create1');
        this.router.navigate(['./homepage/news-scholarship/create']);
      });

    this.isDetailShown = true;
    this.selectedCompetenceFrame = '';
  }

  getListComLength() {
    return this.listLength;
  }

  getPageList(page?: number, scrollToTop?: boolean, str?: string) {
    this.currentPage = page == undefined ? this.currentPage : page;

    if (this.filterList) {
      let tempList: scholarship[] = [];
      this.service.listScholarship.forEach((comFrame: scholarship) => {
        if (
          this.filterList.every((filterKeyword: string) => {
            const lowerFilterKeyword = filterKeyword.toLowerCase();
            if (comFrame.shortContent === undefined) {
              return (
                // if(this.sevices.checkVietnames())
                this.service
                  .toLowerCaseNonAccentVietnamese(comFrame.title)
                  .includes(lowerFilterKeyword)
                //   ||
                // comFrame.competences.some((competence: string) =>
                //   this.service
                //     .toLowerCaseNonAccentVietnamese(competence)
                //     .includes(lowerFilterKeyword)
                // )
              );
            } else {
              return (
                // if(this.sevices.checkVietnames())
                this.service
                  .toLowerCaseNonAccentVietnamese(
                    comFrame.title,
                    lowerFilterKeyword
                  )
                  .includes(lowerFilterKeyword) ||
                this.service
                  .toLowerCaseNonAccentVietnamese(
                    comFrame.shortContent,
                    lowerFilterKeyword
                  )
                  .includes(lowerFilterKeyword)
              );
            }
          })
        ) {
          tempList.push(comFrame);
        }
      });
      this.listLength = tempList.length;

      if (this.order == 1) {
        tempList = tempList.sort((n1, n2) => {
          if (n1.title > n2.title) return 1;
          if (n1.title < n2.title) return -1;
          return 0;
        });
      } else if (this.order == -1) {
        tempList = tempList.sort((n1, n2) => {
          if (n1.title < n2.title) return 1;
          if (n1.title > n2.title) return -1;
          return 0;
        });
      }

      this.list = tempList.slice(
        this.currentPage * this.paginationAmount,
        (this.currentPage + 1) * this.paginationAmount
      );
    } else {
      this.listLength = this.service.listCom.length;
      this.list = this.service.listScholarship.slice(
        this.currentPage * this.paginationAmount,
        (this.currentPage + 1) * this.paginationAmount
      );
    }

    if (this.list.length == 0 && this.currentPage != 0) {
      this.getPageList(this.currentPage - 1);
    }

    if (scrollToTop) {
      this.subscriptions.add(
        timer(50).subscribe(() => {
          this.competenceFrameList.nativeElement.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        })
      );
    }
  }

  setOrder(order: number) {
    this.order = order;
    this.getPageList(0, true);
  }

  setPaginationAmount(amount: number) {
    this.paginationAmount = amount;
    this.getPageList(0, true);
  }

  cancelDetailShow() {
    this.isDetailShown = false;
    this.selectedCompetenceFrame = '';
  }

  onActivate() {
    this.isDetailShown = true;
  }
  onDeactivate() {
    this.isDetailShown = false;
  }
}
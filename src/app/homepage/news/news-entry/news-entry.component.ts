import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
import { competion } from '../../model/news.model';
import { NewsCompetionService } from '../services/news-competion.service';

@Component({
  selector: 'app-news-entry',
  templateUrl: './news-entry.component.html',
  styleUrls: ['./news-entry.component.less'],
})
export class NewsEntryComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('competenceFrameList', { static: true })
  competenceFrameList!: ElementRef<HTMLElement>;
  showQt: boolean;
  flex = false;
  public list: competion[] = [];
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
  private rawListCom$: Observable<competion[]> = this.service
    .getListCompetion()
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
    private service: NewsCompetionService,
    private modal: NzModalService,
    private homepage: HomepageComponent,
    private cdr: ChangeDetectorRef
  ) {
    homepage.select = 'news';
    homepage.showLogo = false;
    this.flex = false;
    this.service
      .getListCompetion()
      .subscribe((res) => (this.listLength = res.data.length));
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
  ngAfterViewInit() {
    this.cdr.detectChanges();
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
  isSearchCompetence(competence: competion, searches: string[]): boolean {
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

  selectCompetenceFrame(value: string, obj: competion, cardRef: HTMLElement) {
    this.subscriptions.add(
      timer(50).subscribe(() => {
        cardRef.scrollIntoView({
          behavior: 'smooth',
        });
      })
    );

    this.service.competion = obj;
    this.selectedCompetenceFrame = value;

    console.log('flex', this.flex);
    this.router.navigate(['./homepage/news-competion/' + value]);
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

  deleteCompetenceFrame(name: string, code: string, event: Event) {
    event.stopPropagation();
    this.modal.warning({
      nzTitle: `Bạn có muốn xóa cuộc thi: ${name} không?`,
      nzOkDanger: true,
      nzClassName: 'customPopUp warning',
      nzOnOk: () => {
        return this.deleteByCode(code);
      },
      nzOkText: 'Xóa',
      nzCancelText: 'Hủy',
      nzOnCancel: () => {
        return;
      },
    });
  }
  deleteByCode(code: string) {
    this.service.deleteByCode(code).subscribe((res) => {
      if (res.errorCode === null) {
        this.isDetailShown = false;
        this.getPageList(this.currentPage);
        window.location.reload();
        this.message.success('Xoá tin tức thành công');
      } else {
        this.message.error('Xoá thất bại');
      }
    });
  }
  createCompetenceFrame() {
    console.log('create');
    this.service.conditionDup = false;
    this.router
      .navigate(['./homepage/news-competion'], { skipLocationChange: true })
      .then(() => {
        console.log('create1');
        this.router.navigate(['./homepage/news-competion/create']);
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
      let tempList: competion[] = [];
      this.service.listCompetion.forEach((comFrame: competion) => {
        if (
          this.filterList.every((filterKeyword: string) => {
            const lowerFilterKeyword = filterKeyword.toLowerCase();
            if (comFrame.shortContent === undefined) {
              return (
                // if(this.sevices.checkVietnames())
                this.service
                  .toLowerCaseNonAccentVietnamese(comFrame.title)
                  .includes(lowerFilterKeyword) ||
                this.service
                  .toLowerCaseNonAccentVietnamese(comFrame.codeCategory)
                  .includes(lowerFilterKeyword) ||
                this.service
                  .toLowerCaseNonAccentVietnamese(comFrame.shortContent)
                  .includes(lowerFilterKeyword) ||
                this.service
                  .toLowerCaseNonAccentVietnamese(comFrame.location)
                  .includes(lowerFilterKeyword) ||
                this.service
                  .toLowerCaseNonAccentVietnamese(comFrame.introduction)
                  .includes(lowerFilterKeyword) ||
                this.service
                  .toLowerCaseNonAccentVietnamese(comFrame.information)
                  .includes(lowerFilterKeyword) ||
                this.service
                  .toLowerCaseNonAccentVietnamese(comFrame.subject)
                  .includes(lowerFilterKeyword) ||
                this.service
                  .toLowerCaseNonAccentVietnamese(comFrame.prize)
                  .includes(lowerFilterKeyword) ||
                this.service
                  .toLowerCaseNonAccentVietnamese(comFrame.contact)
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
                    comFrame.codeCategory,
                    lowerFilterKeyword
                  )
                  .includes(lowerFilterKeyword) ||
                this.service
                  .toLowerCaseNonAccentVietnamese(
                    comFrame.shortContent,
                    lowerFilterKeyword
                  )
                  .includes(lowerFilterKeyword) ||
                this.service
                  .toLowerCaseNonAccentVietnamese(
                    comFrame.location,
                    lowerFilterKeyword
                  )
                  .includes(lowerFilterKeyword) ||
                this.service
                  .toLowerCaseNonAccentVietnamese(
                    comFrame.introduction,
                    lowerFilterKeyword
                  )
                  .includes(lowerFilterKeyword) ||
                this.service
                  .toLowerCaseNonAccentVietnamese(
                    comFrame.information,
                    lowerFilterKeyword
                  )
                  .includes(lowerFilterKeyword) ||
                this.service
                  .toLowerCaseNonAccentVietnamese(
                    comFrame.subject,
                    lowerFilterKeyword
                  )
                  .includes(lowerFilterKeyword) ||
                this.service
                  .toLowerCaseNonAccentVietnamese(
                    comFrame.prize,
                    lowerFilterKeyword
                  )
                  .includes(lowerFilterKeyword) ||
                this.service
                  .toLowerCaseNonAccentVietnamese(
                    comFrame.contact,
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
      this.list = this.service.listCompetion.slice(
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

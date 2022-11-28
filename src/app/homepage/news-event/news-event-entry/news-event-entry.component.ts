import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NewsEventService } from '../services/news-event.service';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject, combineLatest, map, Subscription, timer } from 'rxjs';
import { ComFrame } from '../../model/competence-frames.model';
import { HomepageComponent } from '../../homepage.component';
import { event } from '../../model/news.model';

@Component({
  selector: 'app-news-entry',
  templateUrl: './news-event-entry.component.html',
  styleUrls: ['./news-event-entry.component.less'],
})
export class NewsEventEntryComponent implements OnInit, OnDestroy {
  @ViewChild('competenceFrameList', { static: true })
  competenceFrameList!: ElementRef<HTMLElement>;
  showQt: boolean;
  flex = false;
  public list: event[] = [];
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
  private rawListCom$ = this.service.getListOfCompetences();
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
    private service: NewsEventService,
    private modal: NzModalService,
    private homepage: HomepageComponent
  ) {
    homepage.showLogo = false;
    this.flex = false;
    this.getPageList(this.currentPage);
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
  onPageIndexChange(event: number) {
    this.pageIndex$.next(event);
  }
  onPageSizeChange(event: number) {
    this.pageSize$.next(event);
  }
  onListOfSearchesChange(event: string[]) {
    this.listOfSearches$.next(event);
  }
  isSearchCompetence(competence: event, searches: string[]): boolean {
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

  selectCompetenceFrame(value: string, obj: event, cardRef: HTMLElement) {
    this.subscriptions.add(
      timer(50).subscribe(() => {
        cardRef.scrollIntoView({
          behavior: 'smooth',
        });
      })
    );

    this.service.event = obj;
    this.selectedCompetenceFrame = value;

    console.log('flex', this.flex);
    this.router.navigate(['./homepage/news-event/' + value]);
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
      nzTitle: `Bạn có muốn xóa khung năng lực ${id} không?`,
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
    this.message.success('Xoá thành công khung năng lực');
    this.router.navigate(['./homepage/news-event']);
    this.isDetailShown = false;
    this.getPageList(this.currentPage);
  }
  createCompetenceFrame() {
    console.log('create');
    this.service.conditionDup = false;
    this.router
      .navigate(['./homepage/news-event'], { skipLocationChange: true })
      .then(() => {
        console.log('create1');
        this.router.navigate(['./homepage/news-event/create']);
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
      let tempList: event[] = [];
      this.service.listEvent.forEach((comFrame: event) => {
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
      this.list = this.service.listEvent.slice(
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

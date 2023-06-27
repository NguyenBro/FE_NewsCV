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
import { AutoJob } from '../../model/news.model';
import { AutoFindAppliService } from '../auto-find-appli.service';

@Component({
  selector: 'app-auto-find-appli-entry',
  templateUrl: './auto-find-appli-entry.component.html',
  styleUrls: ['./auto-find-appli-entry.component.less']
})
export class AutoFindAppliEntryComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('competenceFrameList', { static: true })
  competenceFrameList!: ElementRef<HTMLElement>;
  showQt: boolean;
  loadDing = true;
  public list: AutoJob[] = [];
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
  private rawListCom$: Observable<AutoJob[]> = this.service
    .getListAutoJob()
    .pipe(map((data) => data.data));
  public listCom$: Observable<AutoJob[]> = combineLatest({
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
    private service: AutoFindAppliService,
    private modal: NzModalService,
    private homepage: HomepageComponent,
    private cdr: ChangeDetectorRef
  ) {
    homepage.select = 'autojob';
    homepage.showLogo = false;
    this.service
      .getListAutoJob()
      .subscribe((res) => {
        this.listLength = res.data.length;
      });
    this.getPageList(this.currentPage);
    if (
      localStorage.getItem('role') === 'ADMIN' 
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
  isSearchCompetence(competence: AutoJob, searches: string[]): boolean {
    this.loadDing = false;
    if (searches.length === 0) return true;
    return searches.every(
      (search) =>
        competence.specialize
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase()) ||
        competence.language
          ?.toLocaleLowerCase()
          .includes(search.toLocaleLowerCase())||
        competence.position
          ?.toLocaleLowerCase()
          .includes(search.toLocaleLowerCase())||
        competence.experience
          ?.toLocaleLowerCase()
          .includes(search.toLocaleLowerCase())||
        competence.location
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

  selectCompetenceFrame(value: string, obj: AutoJob, cardRef: HTMLElement) {
    this.subscriptions.add(
      timer(50).subscribe(() => {
        cardRef.scrollIntoView({
          behavior: 'smooth',
        });
      })
    );

    this.service.AutoJob = obj;
    this.selectedCompetenceFrame = value;

    this.router.navigate(['./homepage/AutoFindAppli/' + value]);
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

  deleteCompetenceFrame(code: string, name: string, event: Event) {
    event.stopPropagation();
    this.modal.warning({
      nzTitle: `Bạn có muốn xóa công ty ${name} không?`,
      nzOkDanger: true,
      nzClassName: 'customPopUp warning',
      nzOnOk: () => {
        return this.deleteById(code);
      },
      nzOkText: 'Xóa',
      nzCancelText: 'Hủy',
      nzOnCancel: () => {
        return;
      },
    });
  }
  deleteById(code: string) {
    this.service.deleteAutoJobByCode(code).subscribe((res) => {
      if (res.errorCode === null) {
        this.message.success('Xoá công ty thành công');
        this.router.navigate(['./homepage/AutoFindAppli']);
        this.isDetailShown = false;
        this.getPageList(this.currentPage);
      } else {
        this.message.error('Xoá thất bại');
      }
    });
  }
  createCompetenceFrame() {
    this.service.conditionDup = false;
    this.router
      .navigate(['./homepage/AutoFindAppli'], { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['./homepage/AutoFindAppli/create']);
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
      let tempList: AutoJob[] = [];
      this.service.listAutoJob.forEach((AutoJob: AutoJob) => {
        if (
          this.filterList.every((filterKeyword: string) => {
            const lowerFilterKeyword = filterKeyword.toLowerCase();
            if (AutoJob.specialize === undefined) {
              return (
                // if(this.sevices.checkVietnames())
                this.service
                  .toLowerCaseNonAccentVietnamese(AutoJob.language)
                  .includes(lowerFilterKeyword) ||
                this.service
                  .toLowerCaseNonAccentVietnamese(AutoJob.position)
                  .includes(lowerFilterKeyword) ||
                this.service
                  .toLowerCaseNonAccentVietnamese(AutoJob.experience)
                  .includes(lowerFilterKeyword)||
                  this.service
                    .toLowerCaseNonAccentVietnamese(AutoJob.location)
                    .includes(lowerFilterKeyword)
              );
            } else {
              return (
                // if(this.sevices.checkVietnames())
                this.service
                  .toLowerCaseNonAccentVietnamese(
                    AutoJob.language,
                    lowerFilterKeyword
                  )
                  .includes(lowerFilterKeyword) ||
                this.service
                  .toLowerCaseNonAccentVietnamese(
                    AutoJob.specialize,
                    lowerFilterKeyword
                  )
                  .includes(lowerFilterKeyword) ||
                this.service
                  .toLowerCaseNonAccentVietnamese(
                    AutoJob.position,
                    lowerFilterKeyword
                  )
                  .includes(lowerFilterKeyword) ||
                this.service
                  .toLowerCaseNonAccentVietnamese(
                    AutoJob.experience,
                    lowerFilterKeyword
                  )
                  .includes(lowerFilterKeyword)||
                  this.service
                    .toLowerCaseNonAccentVietnamese(
                      AutoJob.location,
                      lowerFilterKeyword
                    )
                    .includes(lowerFilterKeyword)
              );
            }
          })
        ) {
          tempList.push(AutoJob);
        }
      });
      this.listLength = tempList.length;

      if (this.order == 1) {
        tempList = tempList.sort((n1, n2) => {
          if (n1.specialize > n2.specialize) return 1;
          if (n1.specialize < n2.specialize) return -1;
          return 0;
        });
      } else if (this.order == -1) {
        tempList = tempList.sort((n1, n2) => {
          if (n1.specialize < n2.specialize) return 1;
          if (n1.specialize > n2.specialize) return -1;
          return 0;
        });
      }

      this.list = tempList.slice(
        this.currentPage * this.paginationAmount,
        (this.currentPage + 1) * this.paginationAmount
      );
    } else {
      this.listLength = this.service.listAutoJob.length;
      this.list = this.service.listAutoJob.slice(
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

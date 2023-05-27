import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject, Observable, combineLatest, map, mergeMap, tap } from 'rxjs';
import { ComFrame } from '../../model/competence-frames.model';
import { event, user,Comment } from '../../model/news.model';
import { newsService } from '../../services/news.service';
import { NewsEventEntryComponent } from '../news-event-entry/news-event-entry.component';
import { NewsEventService } from '../services/news-event.service';
import { formatDistance } from 'date-fns';
@Component({
  selector: 'app-news-view',
  templateUrl: './news-event-view.component.html',
  styleUrls: ['./news-event-view.component.less'],
})
export class NewsEventViewComponent implements OnInit {
  @ViewChild('app') app: HTMLElement | null | undefined;
  public comFrame: event | undefined = new event();
  public temp: HTMLElement | undefined;
  public id = '';
  public currentComment: Comment = new Comment();
  showQt: boolean;
  data: any[] = [];
  submitting = false;
  inputValue = '';
  user: user = new user();
  public comFrameInfo$ = this.route.params.pipe(
    mergeMap((p) => {
      if (!this.service.isComFrameExist(p['comFrameId'])) {
        this.cancel();
      }
      this.id = p['comFrameId'];
      return this.service.getEventInfo(p['comFrameId']);
    }),
    tap((it) => {
      this.comFrame = it;
      this.rawListCom$=this.servicenew.getListComment(this.comFrame?.id.toString()).pipe(map((data)=>data.data));
      this.listComment$ = combineLatest({
        listOfCompetences: this.rawListCom$,
        pageIndex: this.pageIndex$,
        pageSize: this.pageSize$,
        searches: this.listOfSearches$,
        refresh: this.refreshBehavior$,
      }).pipe(
        map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
          listOfCompetences
            .slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
        )
      )
    })
  );
  private listOfSearches$ = new BehaviorSubject<string[]>([]);
  private pageIndex$ = new BehaviorSubject(1);
  private pageSize$ = new BehaviorSubject(15);
  private refreshBehavior$ = this.service.getRefresh();
  private rawListCom$: Observable<Comment[]> = this.servicenew
  .getListComment(this.comFrame?.id.toString())
  .pipe(map((data) => data.data));
  public listComment$ = combineLatest({
    listOfCompetences: this.rawListCom$,
    pageIndex: this.pageIndex$,
    pageSize: this.pageSize$,
    searches: this.listOfSearches$,
    refresh: this.refreshBehavior$,
  }).pipe(
    map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
      listOfCompetences
        .slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
    )
  );

  constructor(
    private message: NzMessageService,
    private route: ActivatedRoute,
    private service: NewsEventService,
    private router: Router,
    private news: NewsEventEntryComponent,
    private modal: NzModalService,
    private servicenew: newsService
  ) {
    this.news.flex = true;
    if (
      localStorage.getItem('role') === 'ADMIN' ||
      localStorage.getItem('role') === 'COMPANY'
    ) {
      this.showQt = true;
    } else {
      this.showQt = false;
    }
    servicenew
    .getLoggedInUser(localStorage.getItem('email') || '')
    .subscribe((user) => {
      if (user.errorCode === null) {
        this.user = user.data;
      }
    });
  }

  ngOnInit(): void {
    this.comFrame = this.service.event;
  }
  loadPage() {
    window.location.reload();
  }
  handleSubmit(): void {
    if(this.comFrame!=null){
      this.currentComment.content = this.inputValue;
      this.currentComment.codeNews = this.comFrame.code;
      this.currentComment.userId = Number(this.user.id);
      this.servicenew
      .addComment(this.currentComment)
        .subscribe((Res) => {
          if (Res.errorCode === null) {
            this.rawListCom$=this.servicenew.getListComment(this.comFrame?.id.toString()).pipe(map((data)=>data.data));
            this.listComment$ = combineLatest({
              listOfCompetences: this.rawListCom$,
              pageIndex: this.pageIndex$,
              pageSize: this.pageSize$,
              searches: this.listOfSearches$,
              refresh: this.refreshBehavior$,
            }).pipe(
              map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
                listOfCompetences
                  .slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
              )
            )
            this.inputValue='';
          } else {
            this.message.error('Thêm thất bại');
          }
        });
    }
  }
  public create() {
    this.service.conditionDup = false;
    this.router.navigate(['./news-event/create']);
  }
  public update() {
    this.router.navigate(['./news-event/' + this.id + '/edit']);
  }
  public cancel() {
    this.router.navigate(['./news-event/']);

    console.log('flex-cancel', this.news.flex);
    this.news.cancelDetailShow();
  }
  public delete() {
    this.modal.warning({
      nzTitle: `Bạn có muốn xóa tin: ${this.comFrame?.title} không?`,
      nzOkDanger: true,
      nzClassName: 'customPopUp warning',
      nzOnOk: () => {
        return this.remove();
      },
      nzOkText: 'Xóa',
      nzCancelText: 'Hủy',
      nzOnCancel: () => {
        return;
      },
    });
  }
  remove() {
    if (this.comFrame) {
      this.service.deleteEvenByCode(this.comFrame.code).subscribe((res) => {
        if (res.errorCode === null) {
          this.news.getPageList();
          this.cancel();
          window.location.reload();
          this.message.success('Xoá tin tức thành công');
        } else {
          this.message.error('Xoá thất bại');
        }
      });
    }
  }
  public duplicateClick() {
    this.message.success('Sao chép thành công tin tức');
    this.service.conditionDup = true;
    this.router.navigate(['./news-event/create'], {
      state: {
        id: this.comFrame?.id,
      },
    });
  }
  edit(item: any): void {
    
  }
}

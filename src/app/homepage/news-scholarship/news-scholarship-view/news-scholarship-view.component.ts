import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject, combineLatest, map, mergeMap, Observable, tap } from 'rxjs';
import { Comment, competion, scholarship, user } from '../../model/news.model';
import { NewsScholarshipEntryComponent } from '../news-scholarship-entry/news-scholarship-entry.component';
import { NewsScholarshipService } from '../services/news-scholarship.service';
import { formatDistance } from 'date-fns';
import { newsService } from '../../services/news.service';


@Component({
  selector: 'app-news-view',
  templateUrl: './news-scholarship-view.component.html',
  styleUrls: ['./news-scholarship-view.component.less'],
})
export class NewsScholarshipViewComponent implements OnInit {
  @ViewChild('app') app: HTMLElement | null | undefined;
  public comFrame: scholarship | undefined = new scholarship();
  public currentComment: Comment = new Comment();
  public temp: HTMLElement | undefined;
  public listComment = new Array<String>();
  public commentTemp = new String();
  user: user = new user();
  public id = '';
  showQt: boolean;
  data: any[] = [];
  submitting = false;
  inputValue = '';
  initLoading = true;
  loadingMore = false;
  public comFrameInfo$ = this.route.params.pipe(
    mergeMap((p) => {
      if (!this.service.isComFrameExist(p['comFrameId'])) {
        this.cancel();
      }
      this.id = p['comFrameId'];
      
      return this.service.getScholarshipInfo(p['comFrameId']);
    }),
    tap((it) => {
      this.comFrame = it;
      this.rawListCom$=this.servicenew.getListComment(this.comFrame?.id.toString()).pipe(map((data)=>data.data));
      this.listCom$ = combineLatest({
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
     this.listCom$.subscribe((res)=>{
        for (let index = 0; index < res.length; index++) {
          console.log('commet time',res[index].time)
        }
      });

  })
  );

  private listOfSearches$ = new BehaviorSubject<string[]>([]);
  private pageIndex$ = new BehaviorSubject(1);
  private pageSize$ = new BehaviorSubject(15);
  private refreshBehavior$ = this.service.getRefresh();
  private rawListCom$: Observable<Comment[]> = this.servicenew
  .getListComment(this.comFrame?.id.toString())
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
        .slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
    )
  );


  constructor(
    private message: NzMessageService,
    private route: ActivatedRoute,
    private service: NewsScholarshipService,
    private router: Router,
    private news: NewsScholarshipEntryComponent,
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
    this.comFrame = this.service.scholarship;
  }
  loadPage() {
    window.location.reload();
  }
  handleSubmit(): void {
    if(this.comFrame!=null){
      this.currentComment.content = this.inputValue;
      this.currentComment.codeNews = this.comFrame.code;
      this.currentComment.userId = Number(this.user.id);
      this.service
        .insertCmt(this.currentComment)
        .subscribe((Res) => {
          if (Res.errorCode === null) {
            this.cancel();
            setTimeout(this.loadPage, 1000);
            this.message.success('Thêm thành công');
          } else {
            this.message.error('Thêm thất bại');
          }
        });
    }
        
  }
  public create() {
    this.service.conditionDup = false;
    this.router.navigate(['./news-scholarship/create']);
  }
  public update() {
    this.router.navigate(['./news-scholarship/' + this.id + '/edit']);
  }
  public cancel() {
    this.router.navigate(['./news-scholarship/']);

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
      this.service.deleteByCode(this.comFrame.code).subscribe((res) => {
        if (res.errorCode === null) {
          this.message.success('Xoá tin tức thành công');
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
    this.router.navigate(['./news-scholarship/create'], {
      state: {
        id: this.comFrame?.id,
      },
    });
  }
  comment() {
    this.listComment.push(this.commentTemp);
    this.commentTemp = new String();
    console.log('enter', this.listComment);
  }
  edit(item: any): void {
    
  }

}

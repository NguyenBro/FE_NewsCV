import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import {
  BehaviorSubject,
  combineLatest,
  map,
  mergeMap,
  Observable,
  tap,
} from 'rxjs';
import { competion, Comment, user } from '../../model/news.model';
import { newsService } from '../../services/news.service';
import { NewsEntryComponent } from '../news-entry/news-entry.component';
import { NewsCompetionService } from '../services/news-competion.service';
import { formatDistance } from 'date-fns';
@Component({
  selector: 'app-news-view',
  templateUrl: './news-view.component.html',
  styleUrls: ['./news-view.component.less'],
})
export class NewsViewComponent implements OnInit {
  @ViewChild('app') app: HTMLElement | null | undefined;
  public comFrame: competion | undefined = new competion();
  public temp: HTMLElement | undefined;
  public id = '';
  showQt: boolean;
  showCmt = false;
  data: any[] = [];
  submitting = false;
  user: user = new user();
  inputValue = '';
  public currentComment: Comment = new Comment();
  public comFrameInfo$ = this.route.params.pipe(
    mergeMap((p) => {
      if (!this.service.isComFrameExist(p['comFrameId'])) {
        this.cancel();
      }
      this.id = p['comFrameId'];
      return this.service.getCompetionInfo(p['comFrameId']);
    }),
    tap((it) => {
      this.comFrame = it;
      this.rawListCom$ = this.servicenew
        .getListComment(this.comFrame?.id.toString())
        .pipe(map((data) => data.data));
      this.listComment$ = combineLatest({
        listOfCompetences: this.rawListCom$,
        pageIndex: this.pageIndex$,
        pageSize: this.pageSize$,
        searches: this.listOfSearches$,
        refresh: this.refreshBehavior$,
      }).pipe(
        map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
          listOfCompetences.slice(
            (pageIndex - 1) * pageSize,
            pageIndex * pageSize
          )
        )
      );
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
      listOfCompetences.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
    )
  );
  //biến cmt
  idUser = localStorage.getItem('id');
  idEdit: Number = 0;
  submittingCmt = false;
  public listComment = new Array<String>();
  public commentTemp = new String();
  contentUpdate = '';
  constructor(
    private message: NzMessageService,
    private route: ActivatedRoute,
    private service: NewsCompetionService,
    private router: Router,
    private news: NewsEntryComponent,
    private modal: NzModalService,
    private servicenew: newsService
  ) {
    this.idUser = localStorage.getItem('id');
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
    this.comFrame = this.service.competion;
  }
  loadPage() {
    window.location.reload();
  }
  handleSubmit(): void {
    this.submitting = true;
    if (this.comFrame != null) {
      this.currentComment.content = this.inputValue;
      this.currentComment.codeNews = this.comFrame.code;
      this.currentComment.userId = Number(this.user.id);
      this.servicenew.addComment(this.currentComment).subscribe((Res) => {
        if (Res.errorCode === null) {
          this.rawListCom$ = this.servicenew
            .getListComment(this.comFrame?.id.toString())
            .pipe(map((data) => data.data));
          this.listComment$ = combineLatest({
            listOfCompetences: this.rawListCom$,
            pageIndex: this.pageIndex$,
            pageSize: this.pageSize$,
            searches: this.listOfSearches$,
            refresh: this.refreshBehavior$,
          }).pipe(
            map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
              listOfCompetences.slice(
                (pageIndex - 1) * pageSize,
                pageIndex * pageSize
              )
            )
          );
          this.inputValue = '';
          this.submitting = false;
        } else {
          this.message.error('Thêm thất bại');
        }
      });
    }
  }
  public create() {
    this.service.conditionDup = false;
    this.router.navigate(['./news-competion/create']);
  }
  public update() {
    this.router.navigate(['./news-competion/' + this.id + '/edit']);
  }
  public cancel() {
    this.router.navigate(['./news-competion/']);

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
    this.router.navigate(['./news-competion/create'], {
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
  edit(id: Number, content: string): void {
    this.idEdit = id;
    this.contentUpdate = content;
  }
  updateCmt(id: Number, content: string) {
    this.submittingCmt = true;
    this.servicenew.updateCmt(id.toString(), content).subscribe((res) => {
      console.log('giá trị của update ', res);
      if (res.errorCode === null) {
        this.rawListCom$ = this.servicenew
          .getListComment(this.comFrame?.id.toString())
          .pipe(map((data) => data.data));
        this.listComment$ = combineLatest({
          listOfCompetences: this.rawListCom$,
          pageIndex: this.pageIndex$,
          pageSize: this.pageSize$,
          searches: this.listOfSearches$,
          refresh: this.refreshBehavior$,
        }).pipe(
          map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
            listOfCompetences.slice(
              (pageIndex - 1) * pageSize,
              pageIndex * pageSize
            )
          )
        );
        this.idEdit = 0;
        this.submittingCmt = false;
      } else {
        this.message.error('Có lỗi xảy ra');
      }
    });
  }
  cancelUpdateCmt() {
    this.idEdit = 0;
    this.submittingCmt = false;
  }
  disableCmt(id: Number) {
    this.servicenew.disableCmt(id.toString()).subscribe((res) => {
      console.log('giá trị xoá bình luận', res);
      if (res.errorCode === null) {
        this.rawListCom$ = this.servicenew
          .getListComment(this.comFrame?.id.toString())
          .pipe(map((data) => data.data));
        this.listComment$ = combineLatest({
          listOfCompetences: this.rawListCom$,
          pageIndex: this.pageIndex$,
          pageSize: this.pageSize$,
          searches: this.listOfSearches$,
          refresh: this.refreshBehavior$,
        }).pipe(
          map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
            listOfCompetences.slice(
              (pageIndex - 1) * pageSize,
              pageIndex * pageSize
            )
          )
        );
        this.message.success('Đã xoá bình luận');
      } else {
        this.message.error('Có lỗi xảy ra');
      }
    });
  }
}

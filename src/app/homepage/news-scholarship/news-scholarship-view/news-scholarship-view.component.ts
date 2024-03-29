import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { mergeMap, tap } from 'rxjs';
import { competion, scholarship } from '../../model/news.model';
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
  public temp: HTMLElement | undefined;
  public listComment = new Array<String>();
  public commentTemp = new String();
  public id = '';
  showQt: boolean;
  data: any[] = [];
  submitting = false;
  user = {
    author: this.servicenew.userLogin.name,
    avatar: this.servicenew.userLogin.avatar,
  };
  inputValue = '';

  public comFrameInfo$ = this.route.params.pipe(
    mergeMap((p) => {
      if (!this.service.isComFrameExist(p['comFrameId'])) {
        this.cancel();
      }
      this.id = p['comFrameId'];
      return this.service.getScholarshipInfo(p['comFrameId']);
    }),
    tap((it) => (this.comFrame = it))
  );
  x: Element | undefined;
  // app: HTMLElement | null | undefined;
  // app: HTMLElement | null | undefined;

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
  }

  ngOnInit(): void {
    this.comFrame = this.service.scholarship;
  }
  handleSubmit(): void {
    this.submitting = true;
    const content = this.inputValue;
    this.inputValue = '';
    setTimeout(() => {
      this.submitting = false;
      this.data = [
        ...this.data,
        {
          ...this.user,
          content,
          datetime: new Date(),
          displayTime: formatDistance(new Date(), new Date()),
        },
      ].map((e) => ({
        ...e,
        displayTime: formatDistance(new Date(), e.datetime),
      }));
    }, 800);
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
}

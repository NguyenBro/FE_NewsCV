import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { mergeMap, tap } from 'rxjs';
import { ComFrame } from '../../model/competence-frames.model';
import { event } from '../../model/news.model';
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
      return this.service.getCompetionInfo(p['comFrameId']);
    }),
    tap((it) => (this.comFrame = it))
  );
  x: Element | undefined;
  // app: HTMLElement | null | undefined;
  // app: HTMLElement | null | undefined;

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
  }

  ngOnInit(): void {
    this.comFrame = this.service.event;
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
      this.message.success('Xoá thành công tin tức');
      this.service.delete(this.comFrame);
      this.news.getPageList();
      this.cancel();
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
}

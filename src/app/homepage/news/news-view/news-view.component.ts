import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { mergeMap, tap } from 'rxjs';
import { competion } from '../../model/news.model';
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
    private service: NewsCompetionService,
    private router: Router,
    private news: NewsEntryComponent,
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
    this.comFrame = this.service.competion;
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
      nzTitle: `B???n c?? mu???n x??a tin: ${this.comFrame?.title} kh??ng?`,
      nzOkDanger: true,
      nzClassName: 'customPopUp warning',
      nzOnOk: () => {
        return this.remove();
      },
      nzOkText: 'X??a',
      nzCancelText: 'H???y',
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
          this.message.success('Xo?? tin t???c th??nh c??ng');
        } else {
          this.message.error('Xo?? th???t b???i');
        }
      });
    }
  }
  public duplicateClick() {
    this.message.success('Sao ch??p th??nh c??ng tin t???c');
    this.service.conditionDup = true;
    this.router.navigate(['./news-competion/create'], {
      state: {
        id: this.comFrame?.id,
      },
    });
  }
}

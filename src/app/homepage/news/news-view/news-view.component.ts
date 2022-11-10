import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { mergeMap, tap } from 'rxjs';
import { ComFrame } from '../../model/competence-frames.model';
import { competion } from '../../model/news.model';
import { NewsEntryComponent } from '../news-entry/news-entry.component';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-news-view',
  templateUrl: './news-view.component.html',
  styleUrls: ['./news-view.component.less'],
})
export class NewsViewComponent implements OnInit {
  public comFrame: competion | undefined = new competion();
  public id = '';
  company = 'FPT';
  exp = '20 năm';
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

  constructor(
    private message: NzMessageService,
    private route: ActivatedRoute,
    private service: NewsService,
    private router: Router,
    private news: NewsEntryComponent,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.comFrame = this.service.competion;
  }

  public create() {
    this.service.conditionDup = false;
    this.router.navigate(['./news/create']);
  }
  public update() {
    this.router.navigate(['./news/' + this.id + '/edit']);
  }
  public cancel() {
    this.router.navigate(['./news/']);
    this.news.cancelDetailShow();
  }
  public delete() {
    this.modal.warning({
      nzTitle: `Bạn có muốn xóa năng lực ${this.comFrame?.title} không?`,
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
      this.message.success('Xoá thành công khung năng lực');
      this.service.delete(this.comFrame);
      this.news.getPageList();
      this.cancel();
    }
  }
  public duplicateClick() {
    this.message.success('Sao chép thành công khung năng lực');
    this.service.conditionDup = true;
    this.router.navigate(['./news/create'], {
      state: {
        id: this.comFrame?.id,
      },
    });
  }
}

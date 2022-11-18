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
    private service: NewsScholarshipService,
    private router: Router,
    private news: NewsScholarshipEntryComponent,
    private modal: NzModalService,
    private servicenew: newsService
  ) {
    this.news.flex = true;
  }

  ngOnInit(): void {
    this.comFrame = this.service.scholarship;
    var support = (function () {
      if (!window.DOMParser) return false;
      var parser = new DOMParser();
      try {
        parser.parseFromString('x', 'text/html');
      } catch (err) {
        return false;
      }
      return true;
    })();
    var stringToHTML = function (str: any) {
      // If DOMParser is supported, use it
      if (support) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(str, 'text/html');
        return doc.body;
      }

      // Otherwise, fallback to old-school method
      var dom = document.createElement('div');
      dom.innerHTML = str;
      return dom;
    };
    this.temp = stringToHTML(this.comFrame.introduction);
    this.x = this.temp.getElementsByTagName('div')[0];
    // this.app = document.getElementById('app');
    // this.app?.appendChild(this.temp);
    // 1. Select the div element using the id property
    this.app = document.getElementById('app');
    // 2. Create a new <p></p> element programmatically
    const p = document.createElement('p');
    // 3. Add the text content
    p.textContent = 'Hello, World!';
    // 4. Append the p element to the div element
    this.app?.appendChild(p);
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

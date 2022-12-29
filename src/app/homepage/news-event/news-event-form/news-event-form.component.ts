import { Component } from '@angular/core';

import {
  CdkDragDrop,
  CdkDragEnter,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd/message';
import { map, mergeMap, tap } from 'rxjs';
import { NewsEventEntryComponent } from '../news-event-entry/news-event-entry.component';
import { NewsEventService } from '../services/news-event.service';
import { ComFrame } from '../../model/competence-frames.model';
import { newsService } from '../../services/news.service';
import { event, ResponseObject, user } from '../../model/news.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-event-form.component.html',
  styleUrls: ['./news-event-form.component.less'],
})
export class NewsEventFormComponent {
  user: user = new user();
  public isEmptyName = false;
  public isVisibleModal = false;
  public currentComFrame: event = new event();
  filterList: string[] = [];
  public id = '';
  selectedCategory = '';

  listCategory = [
    { name: 'An toàn thông tin', code: 'an-toan-thong-tin' },
    { name: 'Blockchain', code: 'blockchain' },
    { name: 'Devoop', code: 'devoop' },
    { name: 'Kỹ thuật dữ liệu', code: 'du-lieu' },
    { name: 'Hệ thống thông tin', code: 'he-thong-thong-tin' },
    { name: 'Kỹ thuật máy tính', code: 'ky-thuat-may-tinh' },
    { name: 'Lập trình', code: 'lap-trinh' },
    { name: 'Trí tuệ nhân tạo', code: 'tri-tue-nhan-tao' },
    { name: 'Website', code: 'website' },
    { name: 'Phần Mềm', code: 'software' },
    { name: 'Tester', code: 'kiem-thu' },
    { name: 'Mobile', code: 'mobile' },
    { name: 'Điện Toán Đám Mây', code: 'cloud' },
  ];
  public comFrame$ = this.route.params.pipe(
    map((p) => p['comFrameId']),
    mergeMap((p) => this.service.getEventInfo(p)),
    tap(
      (comFrame) => (this.currentComFrame = new event(comFrame) || new event())
    )
  );
  urlPath = 'https://server-api.newscv.tech';
  constructor(
    private readonly service: NewsEventService,
    private message: NzMessageService,
    private route: ActivatedRoute,
    private router: Router,
    private news: NewsEventEntryComponent,
    private serviceNews: newsService,
    private http: HttpClient
  ) {
    this.news.flex = true;
    this.comFrame$.subscribe();
    serviceNews
      .getLoggedInUser(localStorage.getItem('email') || '')
      .subscribe((user) => {
        if (user.errorCode === null) {
          this.user = user.data;
          console.log('user1131', this.user);
        }
      });
  }

  showModal(): void {
    this.isVisibleModal = true;
  }
  chooseCv(event: any) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData = new FormData();
      formData.append('file', file);
      const headers = new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      });

      this.http
        .post<ResponseObject>(
          `${this.urlPath + '/api/v1/imageFirebase'}`,
          formData,
          {
            headers: headers,
          }
        )
        .subscribe((res) => {
          console.log('fileasdasd', res.data);
          this.currentComFrame.thumbnail = res.data;
        });
    }
  }
  selectCategory(item: { name: string; code: string }) {
    this.selectedCategory = item.name;
    this.currentComFrame.codeCategory = item.code;
    this.currentComFrame.typeNews = item.name;
  }
  public cancel() {
    this.router.navigate(['./homepage/news-event']);
    this.news.isDetailShown = false;
    setTimeout(this.loadPage, 1000);
  }
  loadPage() {
    window.location.reload();
  }
  public save() {
    if (this.currentComFrame.codeCategory != '') {
      if (
        this.currentComFrame.code !== '' &&
        this.currentComFrame.code !== undefined
      ) {
        this.service.updateEventNews(this.currentComFrame).subscribe((res) => {
          if (res.errorCode === null) {
            this.cancel();
            this.message.success('Chỉnh sửa thành công');
          } else {
            this.message.error('Chỉnh sửa thất bại');
          }
        });
      } else {
        this.currentComFrame.type = 'su-kien';
        this.currentComFrame.status = 'Waiting';
        this.currentComFrame.userId = Number(this.user.id);
        this.service.addEvent(this.currentComFrame).subscribe((Res) => {
          if (Res.errorCode === null) {
            this.cancel();
            this.message.success('Thêm thành công');
          } else {
            this.message.error('Thêm thất bại');
          }
        });
      }
      // this.news.getPageList(0, true);
      // this.service.scholarship = this.currentComFrame;
      // this.router.navigate([
      //   '.homepage/news-scholarship/' + this.currentComFrame.code,
      // ]);
      // this.cancel();
    } else if (this.currentComFrame.codeCategory === '') {
      this.message.error('Vui lòng nhập thể loại!', {
        nzDuration: 3000,
      });
    }
  }
  // addFilter(filterText: string) {
  //   if (
  //     !this.filterList.some(
  //       (x) => x.toLowerCase() == filterText.toLowerCase()
  //     ) &&
  //     filterText.length > 0
  //   ) {
  //     this.filterList.push(filterText);
  //     console.log(this.filterList);
  //     this.saveSearchKeyword(filterText);
  //     this.getPageList(0, true);
  //   }
  // }
}

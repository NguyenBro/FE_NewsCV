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
import { NewsScholarshipEntryComponent } from '../news-scholarship-entry/news-scholarship-entry.component';
import { NewsScholarshipService } from '../services/news-scholarship.service';
import { ComFrame } from '../../model/competence-frames.model';
import { ResponseObject, scholarship, user } from '../../model/news.model';
import { newsService } from '../../services/news.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-scholarship-form.component.html',
  styleUrls: ['./news-scholarship-form.component.less'],
})
export class NewsScholarshipFormComponent {
  user: user = new user();
  public isEmptyName = false;
  public isVisibleModal = false;
  public currentComFrame: scholarship = new scholarship();
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
    mergeMap((p) => this.service.getScholarshipInfo(p)),
    tap(
      (comFrame) =>
        (this.currentComFrame = new scholarship(comFrame) || new scholarship())
    )
  );
  urlPath = 'https://server-api.newscv.tech';
  constructor(
    private readonly service: NewsScholarshipService,
    private message: NzMessageService,
    private route: ActivatedRoute,
    private router: Router,
    private serviceNews: newsService,
    private news: NewsScholarshipEntryComponent,
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
  selectCategory(item: { name: string; code: string }) {
    this.selectedCategory = item.name;
    this.currentComFrame.codeCategory = item.code;
    this.currentComFrame.typeNews = item.name;
  }
  showModal(): void {
    this.isVisibleModal = true;
  }

  public cancel() {
    this.router.navigate(['./homepage/news-scholarship']);
    this.news.isDetailShown = false;
  }
  public save() {
    if (this.currentComFrame.codeCategory != '') {
      if (
        this.currentComFrame.code !== '' &&
        this.currentComFrame.code !== undefined
      ) {
        this.service
          .updateScholarshipNews(this.currentComFrame)
          .subscribe((res) => {
            if (res.errorCode === null) {
              window.location.reload();
              this.message.success('Chỉnh sửa thành công');
            } else {
              this.message.error('Chỉnh sửa thất bại');
            }
          });
      } else {
        this.currentComFrame.type = 'hoc-bong';
        this.currentComFrame.status = 'Waiting';
        this.currentComFrame.userId = Number(this.user.id);
        this.service
          .addScholarshipNews(this.currentComFrame)
          .subscribe((Res) => {
            if (Res.errorCode === null) {
              window.location.reload();
              this.message.success('Thêm thành công');
            } else {
              this.message.error('Thêm thất bại');
            }
          });
      }
      this.cancel();
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

  require(event: Event) {
    if (event.target) {
      const element = event.target as HTMLInputElement;
      const name = element.value;
      if (name === '') {
        this.isEmptyName = true;
      } else {
        this.isEmptyName = false;
      }
    }
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

import { Component, ViewChild } from '@angular/core';

import {
  CdkDragDrop,
  CdkDragEnter,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd/message';
import { map, mergeMap, tap } from 'rxjs';
import { CompetenceFramesEntryComponent } from '../competence-frames-entry/competence-frames-entry.component';
import { CompetenceFramesService } from '../services/competence-frames.service';
import { ComFrame } from '../../model/competence-frames.model';
import { Recruit, ResponseObject, user } from '../../model/news.model';
import { newsService } from '../../services/news.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { Editor } from 'ngx-editor';
import { getISOWeek } from 'date-fns';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';

@Component({
  selector: 'app-competence-frame-form',
  templateUrl: './competence-frame-form.component.html',
  styleUrls: ['./competence-frame-form.component.less'],
})
export class CompetenceFrameFormComponent {
  editor: Editor = new Editor();
  isEnglish = false;
  user: user = new user();
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

  startValue: Date | null = null;
  endValue: Date | null = null;
  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;

  public isEmptyName = false;
  public isVisibleModal = false;
  public Recruit: Recruit = new Recruit();
  filterList: string[] = [];
  public id = '';

  public comFrame$ = this.route.params.pipe(
    map((p) => p['comFrameId']),
    mergeMap((p) => this.service.getRecruitInfo(p)),
    tap((comFrame) => (this.Recruit = new Recruit(comFrame) || new Recruit()))
  );

  urlPath = 'https://server-api.newscv.tech';
  constructor(
    private readonly service: CompetenceFramesService,
    private message: NzMessageService,
    private route: ActivatedRoute,
    private router: Router,
    private serviceNews: newsService,
    private competenceFrameCom: CompetenceFramesEntryComponent,
    private http: HttpClient,
    private i18n: NzI18nService
  ) {
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
  ngOnInit(): void {
    this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
  }
  onChange(result: Date): void {
    console.log('onChange: ', result);
  }
  selectCategory(item: { name: string; code: string }) {
    this.selectedCategory = item.name;
    this.Recruit.codeCategory = item.code;
  }
  showModal(): void {
    this.isVisibleModal = true;
  }

  public cancel() {
    this.router.navigate(['./homepage/competence-frames']);
    this.competenceFrameCom.isDetailShown = false;
  }
  public save() {
    if (this.Recruit.title != '') {
      if (this.id !== '' && this.id !== undefined) {
        // this.service.update(this.currentComFrame);
        this.message.success('Chỉnh sửa thành công');
      } else {
        this.Recruit.type = 'tuyen-dung';
        this.Recruit.userId = Number(this.user.id);
        this.Recruit.companyCode = 'fujinet';
        this.Recruit.status = 'Waiting';
        this.service.createJobNews(this.Recruit).subscribe((res) => {
          if (res.errorCode === null) {
            this.message.success('Thêm thành công');
            this.competenceFrameCom.loadData();
            this.cancel();
          } else {
            this.message.error('Thêm thất bại');
          }
        });
      }

      // this.competenceFrameCom.getPageList(0, true);//loi dong nay
      // this.service.recruit = this.Recruit;
      // this.router.navigate([
      //   '.homepage/competence-frames/' + this.Recruit.code,
      // ]);
      // this.cancel();
    } else if (this.Recruit.title === '') {
      this.message.error('Vui lòng nhập tên bộ khung năng lực!', {
        nzDuration: 3000,
      });
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
          if (res.errorCode === null) {
            this.Recruit.thumbnail = res.data;
          } else {
            this.message.error('Ảnh không hợp lệ, vui lòng chọn ảnh khác');
          }
        });
    }
  }
  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  };

  handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.endDatePicker.open();
    }
    console.log('handleStartOpenChange', open);
  }

  handleEndOpenChange(open: boolean): void {
    console.log('handleEndOpenChange', open);
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
}

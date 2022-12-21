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
import { CompanyEntryComponent } from '../company-entry/company-entry.component';
import { CompanyService } from '../services/company';
import { ComFrame } from '../../model/competence-frames.model';
import { Company, Recruit, ResponseObject, user } from '../../model/news.model';
import { newsService } from '../../services/news.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { Editor } from 'ngx-editor';
import { getISOWeek } from 'date-fns';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-competence-frame-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.less'],
})
export class CompanyFormComponent {
  public isEmptyName = false;
  public isVisibleModal = false;
  public currentComFrame: Company = new Company();
  filterList: string[] = [];
  public id = '';
  urlPath = 'https://server-api.newscv.tech';
  public comFrame$ = this.route.params.pipe(
    map((p) => p['comFrameId']),
    mergeMap((p) => this.service.getCompanyInfo(p)),
    tap(
      (comFrame) =>
        (this.currentComFrame = new Company(comFrame) || new Company())
    )
  );
  constructor(
    private readonly service: CompanyService,
    private message: NzMessageService,
    private route: ActivatedRoute,
    private router: Router,
    private competenceFrameCom: CompanyEntryComponent,
    private http: HttpClient
  ) {
    this.comFrame$.subscribe();
  }
  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      this.message.error(`${info.file.name} file upload failed.`);
    }
  }
  showModal(): void {
    this.isVisibleModal = true;
  }
  chooseLogo(event: any) {
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
          this.currentComFrame.logo = res.data;
        });
    }
  }
  chooseBackgroud(event: any) {
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
          this.currentComFrame.background = res.data;
        });
    }
  }
  public cancel() {
    this.router.navigate(['.homepage/companys']);
    this.competenceFrameCom.isDetailShown = false;
  }
  public save() {
    if (this.currentComFrame.name != '') {
      if (this.id !== '' && this.id !== undefined) {
        // this.service.update(this.currentComFrame);
        this.message.success('Chỉnh sửa thành công');
      } else {
        console.log('recruit', this.currentComFrame);
        this.service.addCompany(this.currentComFrame).subscribe();
        this.message.success('Thêm thành công');
      }

      // this.competenceFrameCom.getPageList(0, true);
      // this.service.company = this.currentComFrame;
      // this.router.navigate(['.homepage/companys/' + this.currentComFrame.code]);
      // this.cancel();
    } else if (this.currentComFrame.name === '') {
      this.message.error('Vui lòng nhập tên bộ khung năng lực!', {
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
}

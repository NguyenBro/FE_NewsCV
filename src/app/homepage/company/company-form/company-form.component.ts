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
import { CompanysEntryComponent } from '../companys-entry/companys-entry.component';
import { ComFrame } from '../../model/competence-frames.model';
import { CompanysService } from '../services/companys.service';
import { Company, ResponseObject, user } from '../../model/news.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { newsService } from '../../services/news.service';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.less'],
})
export class CompanyFormComponent {
  isVisible = false;
  user: user = new user();
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
    private readonly service: CompanysService,
    private message: NzMessageService,
    private route: ActivatedRoute,
    private router: Router,
    private competenceFrameCom: CompanysEntryComponent,
    private http: HttpClient,
    private newsServices: newsService
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
  loadPage() {
    window.location.reload();
  }
  public cancel() {
    this.router.navigate(['./homepage/companys']);
    this.competenceFrameCom.isDetailShown = false;
  }
  public save() {
    if (this.currentComFrame.name != '') {
      if (
        this.currentComFrame.code !== '' &&
        this.currentComFrame.code !== undefined
      ) {
        // this.service.update(this.currentComFrame);
        this.message.success('Ch???nh s???a th??nh c??ng');
        this.cancel();
        setTimeout(this.loadPage, 1000);
      } else {
        this.currentComFrame.code = this.removeVietnameseTones(
          this.currentComFrame.name
        )
          .split(' ')
          .join('')
          .toLowerCase();
        this.service.addCompany(this.currentComFrame).subscribe((res) => {
          if (res.errorCode === null) {
            this.user.name = this.currentComFrame.name;
            this.user.email = this.currentComFrame.code + '@newscv.tech';
            this.user.password = this.currentComFrame.code + '@NEWSCV';
            this.user.roleCodes = ['COMPANY'];
            this.user.avatar = this.currentComFrame.logo;
            this.user.background = this.currentComFrame.background;
            this.newsServices.addUser(this.user).subscribe((res) => {
              if (res.errorCode === null) {
                this.isVisible = true;
              }
            });
          } else {
            this.message.error('Th??m th???t b???i');
          }
        });
      }

      // this.competenceFrameCom.getPageList(0, true);
      // this.service.company = this.currentComFrame;
      // this.router.navigate(['.homepage/companys/' + this.currentComFrame.code]);
      // this.cancel();
    } else if (this.currentComFrame.name === '') {
      this.message.error('Vui l??ng nh???p t??n b??? khung n??ng l???c!', {
        nzDuration: 3000,
      });
    }
  }
  handleCancel(): void {
    this.isVisible = false;
    this.cancel();
    setTimeout(this.loadPage, 1000);
  }
  removeVietnameseTones(str: string) {
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'a');
    str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, 'e');
    str = str.replace(/??|??|???|???|??/g, 'i');
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'o');
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, 'u');
    str = str.replace(/???|??|???|???|???/g, 'y');
    str = str.replace(/??/g, 'd');
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'A');
    str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, 'E');
    str = str.replace(/??|??|???|???|??/g, 'I');
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'O');
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, 'U');
    str = str.replace(/???|??|???|???|???/g, 'Y');
    str = str.replace(/??/g, 'D');
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // M???t v??i b??? encode coi c??c d???u m??, d???u ch??? nh?? m???t k?? t??? ri??ng bi???t n??n th??m hai d??ng n??y
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ?? ?? ?? ?? ??  huy???n, s???c, ng??, h???i, n???ng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ?? ?? ??  ??, ??, ??, ??, ??
    // Remove extra spaces
    // B??? c??c kho???ng tr???ng li???n nhau
    str = str.replace(/ + /g, ' ');
    str = str.trim();
    // Remove punctuations
    // B??? d???u c??u, k?? t??? ?????c bi???t
    str = str.replace(
      /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
      ' '
    );
    return str;
  }
}

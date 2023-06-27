import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessService } from './business.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import {
  Advertisement,
  ResponseObject,
  user,
} from '../homepage/model/news.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.less'],
})
export class BusinessComponent implements OnInit {
  pack = '';
  isCom = false;
  isAd = false;
  isVisible = false;
  isVisible2 = false;
  isConfirmLoading = false;
  isConfirmDisable = true;
  code = '';
  public isShow = false;
  public advert: Advertisement = new Advertisement();
  user: user = new user();
  constructor(
    private router: Router,
    private service: BusinessService,
    private message: NzMessageService,
    private modal: NzModalService
  ) {
    this.isShow =
      localStorage.getItem('email') === ('' || undefined || null)
        ? false
        : true;
    this.service
      .getLoggedInUser(localStorage.getItem('email') || '')
      .subscribe((user) => {
        if (user.errorCode === null) {
          this.user = user.data;
          localStorage.setItem('id', this.user.id.toString());
          if (this.user.roleCodes[0] === 'ADMIN') {
            this.isAd = true;
          }
          if (this.user.roleCodes[0] === 'COMPANY') {
            this.isCom = true;
          }
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('email');
          localStorage.removeItem('cv');
          localStorage.removeItem('searchKeyword');
          localStorage.removeItem('role');
        }
      });
    console.log('this.localStorage.getItem', localStorage.getItem('email'));
    console.log('this.isShow', this.isShow);
    this.code =
      localStorage
        .getItem('email')
        ?.slice(0, localStorage.getItem('email')?.indexOf('@')) || '';
  }

  ngOnInit(): void {}
  Packages() {
    this.router.navigate(['./Business/Packages']);
  }
  Home() {
    this.router.navigate(['./Business/Page']);
  }
  Login() {
    this.router.navigate(['./Business/Login']);
  }
  LogOut() {
    this.modal.warning({
      nzTitle: `Bạn có muốn đăng xuất không?`,
      nzOkDanger: true,
      nzClassName: 'customPopUp warning',
      nzOnOk: () => {
        this.isShow = false;
        this.service.logOut();
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('cv');
        localStorage.removeItem('searchKeyword');
        localStorage.removeItem('id');
        localStorage.removeItem('role'); //cần chỉnh
        this.router.navigate(['./Business/Login']);
        setTimeout(this.loadPage, 1000);
        this.message.success('Đăng xuất thành công');
        return;
      },
      nzOkText: 'Có',
      nzCancelText: 'Hủy',
      nzOnCancel: () => {
        return;
      },
    });
  }
  loadPage() {
    window.location.reload();
  }
  StatisPackages() {
    this.router.navigate(['./Business/StatisticsPackages']);
  }
  TransHisCom() {
    this.router.navigate(['./Business/TransHisCom']);
  }
  ScheduleInterview() {
    this.router.navigate(['./Business/Schedule-Interview/Schedules']);
  }
  CreateSchedule() {
    this.router.navigate(['./Business/Schedule-Interview/Create-Schedule']);
  }
  // đăng quảng cáo
  showModal(): void {
    this.service
      .checkExpSubByCom(this.code, 'advertisement')
      .subscribe((res) => {
        if (res.data === true) {
          this.isVisible = true;
        } else {
          this.pack = 'quảng cáo';
          this.isVisible2 = true;
        }
      });
  }
  // đăng tuyển dụng
  showModalRecruit(): void {
    this.service.checkExpSubByCom(this.code, 'recruitment').subscribe((res) => {
      if (res.data === true) {
        this.router.navigate(['./homepage/competence-frames/create']);
      } else {
        this.pack = 'tuyển dụng';
        this.isVisible2 = true;
      }
    });
  }
  handleCancel(): void {
    this.isVisible = false;
  }
  handleCancel2(): void {
    this.isVisible2 = false;
  }
  handleOk1(): void {
    this.isConfirmLoading = true;
    this.advert.company = this.user.name;
    this.service.applyImage(this.advert).subscribe((res) => {
      if (res.data !== null) {
        this.message.success('Đăng quảng cáo thành công');
      }
    });
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }
  chooseCv(event: any) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData = new FormData();
      formData.append('file', file);
      this.service.updateImage(formData).subscribe((res) => {
        this.advert.image = res.data;
        console.log('image', res.data);
        this.message.success('Tải ảnh lên thành công');
        this.isConfirmDisable = false;
      });
    }
  }
}

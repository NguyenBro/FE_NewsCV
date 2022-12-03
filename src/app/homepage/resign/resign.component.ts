import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HomepageComponent } from '../homepage.component';
import { Otp, user } from '../model/news.model';
import { newsService } from '../services/news.service';

@Component({
  selector: 'app-resign',
  templateUrl: './resign.component.html',
  styleUrls: ['./resign.component.less'],
})
export class ResignComponent implements OnInit {
  subjects: any;
  dk: any;
  user: user = new user();
  otp: Otp = new Otp();
  listgender = ['Nam', 'Nữ', 'Giới tính khác'];
  isShow = false;
  constructor(
    private service: newsService,
    private message: NzMessageService,
    private router: Router,
    private homepage: HomepageComponent
  ) {
    homepage.select = 'resign';
    this.homepage.showLogo = true;
    this.isShow = false;
  }

  ngOnInit(): void {}
  log(data: string): void {
    console.log(data);
  }
  onSelectionChange(event: string) {
    this.user.gender = event;
  }
  resign() {
    this.isShow = true;
    this.otp.email = this.user.email;
    console.log('mail');
    this.service.createOtpMail(this.user).subscribe();
  }
  send() {
    this.service.checkOtp(this.otp).subscribe((res) => {
      this.subjects = res.data;
      if (this.subjects === null) {
        this.message.success('Nhập sai mã OTP');
      } else {
        this.user.roleCodes = ['user'];
        this.service.addUser(this.user).subscribe((abs) => {
          this.dk = abs.data;
          if (this.dk === '' || this.dk === null) {
            this.message.success(
              'Thông tin không hợp lệ, vui lòng kiểm tra lại'
            );
          } else {
            this.message.success('Đăng ký thành công');
            this.service.addUser(this.user).subscribe();
            this.router.navigate(['./homepage/page']);
          }
        });
      }
    });
  }
}

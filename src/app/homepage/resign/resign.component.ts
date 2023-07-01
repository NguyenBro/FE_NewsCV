import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HomepageComponent } from '../homepage.component';
import { Otp, user } from '../model/news.model';
import { newsService } from '../services/news.service';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

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
  validateForm!: UntypedFormGroup;
  constructor(
    private service: newsService,
    private message: NzMessageService,
    private router: Router,
    private homepage: HomepageComponent,
    private fb: UntypedFormBuilder
  ) {
    homepage.select = 'resign';
    this.homepage.showLogo = true;
    this.isShow = false;
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      nickname: [null, [Validators.required]],
      captcha: [null, [Validators.required]],
      agree: [false],
    });
  }
  log(data: string): void {
    console.log(data);
  }
  onSelectionChange(event: string) {
    this.user.gender = event;
  }
  submitForm(): void {
    if (this.validateForm.valid) {
      this.user.name = this.validateForm.value['nickname'];
      this.user.password = this.validateForm.value['password'];
      console.log('submit2', this.user);
      this.send();
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.validateForm.controls['checkPassword'].updateValueAndValidity()
    );
  }

  confirmationValidator = (
    control: UntypedFormControl
  ): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };
  getOTP() {
    this.user.email = this.validateForm.value['email'];
    if (this.user.email) {
      this.otp.email = this.user.email;
      this.service.createOtpMail(this.user).subscribe();
    } else {
      this.message.error('Nhập Email để lấy mã OTP');
    }
  }
  send() {
    this.otp.otp = this.validateForm.value['captcha'];
    this.service.checkOtp(this.otp).subscribe((res) => {
      this.subjects = res.data;
      if (this.subjects === null) {
        this.message.error('Nhập sai mã OTP');
      } else {
        this.user.roleCodes = ['user'];
        this.service.addUser(this.user).subscribe((abs) => {
          this.dk = abs.data;
          if (this.dk === '' || this.dk === null) {
            this.message.error(abs.message);
          } else {
            this.message.success('Đăng ký thành công');
            this.router.navigate(['./homepage/login']);
          }
        });
      }
    });
  }
  // resign() {
  //   this.isShow = true;
  //   this.otp.email = this.user.email;
  //   console.log('mail');
  //   this.service.createOtpMail(this.user).subscribe();
  //   this.message.success('Kiểm tra mail để lấy otp');
  // }
  // send() {
  //   this.service.checkOtp(this.otp).subscribe((res) => {
  //     this.subjects = res.data;
  //     if (this.subjects === null) {
  //       this.message.success('Nhập sai mã OTP');
  //     } else {
  //       this.user.roleCodes = ['user'];
  //       this.service.addUser(this.user).subscribe((abs) => {
  //         this.dk = abs.data;
  //         if (this.dk === '' || this.dk === null) {
  //           this.message.success(abs.message);
  //         } else {
  //           this.message.success('Đăng ký thành công');
  //           this.router.navigate(['./homepage/page']);
  //         }
  //       });
  //     }
  //   });
  // }
}

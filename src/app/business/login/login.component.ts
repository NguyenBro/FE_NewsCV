import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { user } from 'src/app/homepage/model/news.model';
import { newsService } from 'src/app/homepage/services/news.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  validateForm!: UntypedFormGroup;
  user: user = new user();
  constructor(
    private service: newsService,
    private message: NzMessageService,
    private router: Router,
    private fb: UntypedFormBuilder
  ) {}

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.login();
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }
  login() {
    this.user.email = this.validateForm.value['userName'];
    this.user.password = this.validateForm.value['password'];
    this.service.login(this.user).subscribe((res) => {
      this.service.token = res.data;
      if (this.service.token === null) {
        this.message.error('Đăng nhập thất bại');
      } else {
        localStorage.setItem('token', this.service.token);
        localStorage.setItem('email', this.user.email);
        localStorage.setItem('code', this.user.roleCodes.toString());
        this.service.getLoggedInUser(this.user.email).subscribe((user) => {
          this.service.userLogin = user.data;
        });
        this.service.getRoleByEmail(this.user.email).subscribe((role) => {
          localStorage.setItem('role', role.data);
          this.service.role = role.data;
        });
        this.router.navigate(['./Business/Page']);
        setTimeout(this.loadPage, 1000);
        this.message.success('Đăng nhập thành công');
      }
    });
  }
  loadPage() {
    window.location.reload();
  }
  resign() {
    this.router.navigate(['./Business/Resign']);
  }
}

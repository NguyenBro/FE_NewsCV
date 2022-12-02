import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HomepageComponent } from '../homepage.component';
import { user } from '../model/news.model';
import { newsService } from '../services/news.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  public listgender = ['Nam', 'Nữ', 'Khác'];
  user: user = new user();
  subjects: any;
  constructor(
    private service: newsService,
    private message: NzMessageService,
    private router: Router,
    private homepagecom: HomepageComponent
  ) {
    homepagecom.select = 'login';
    homepagecom.isShow = false;
    this.homepagecom.showLogo = true;
    this.homepagecom.load = true;
    this.homepagecom.loadData();
  }

  ngOnInit(): void {}
  login() {
    this.service.login(this.user).subscribe((res) => {
      this.service.token = res.data;
      if (this.service.token === null) {
        this.message.success('Đăng nhập thất bại');
      } else {
        this.message.success('Đăng nhập thành công');

        localStorage.setItem('token', this.service.token);
        localStorage.setItem('email', this.user.email);
        this.service.getLoggedInUser(this.user.email).subscribe((user) => {
          this.service.userLogin = user.data;
          console.log('token111', this.service.token);
          console.log('user111', this.service.userLogin);
        });
        this.service.getRoleByEmail(this.user.email).subscribe((role) => {
          localStorage.setItem('role', role.data);
          this.service.role = role.data;
          console.log('role', this.service.role);
        });
        this.router.navigate(['./homepage/page']);
        this.homepagecom.isShow = true;
      }
    });

    // this.router.navigate(['./homepage/page']);
  }
}

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
  userTemp: user = new user();
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
    this.homepagecom.loadData();
  }

  ngOnInit(): void {}
  login() {
    this.service.login(this.user).subscribe((res) => {
      this.service.token = res.data;
      if (this.service.token === null) {
        this.message.error('Đăng nhập thất bại');
      } else {
        localStorage.setItem('token', this.service.token);
        localStorage.setItem('email', this.user.email);
        localStorage.setItem('code', this.user.roleCodes.toString());
        this.service.getLoggedInUser(this.user.email).subscribe((user) => {
          this.service.userLogin = user.data
        });
        // localStorage.setItem('id',this.service.userLogin.id.toString());
        // console.log('id của tau',localStorage.getItem('id'));
        this.service.getRoleByEmail(this.user.email).subscribe((role) => {
          localStorage.setItem('role', role.data);
          this.service.role = role.data;
        });
        this.router.navigate(['./homepage/page']);
        this.homepagecom.isShow = true;
        setTimeout(this.homepagecom.loadPage, 1000);
        this.message.success('Đăng nhập thành công');
      }
    });
  }
  resign() {
    this.router.navigate(['./homepage/resign']);
  }
}

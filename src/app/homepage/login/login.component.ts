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
  ) {}

  ngOnInit(): void {}
  login() {
    this.service.login(this.user).subscribe((res) => {
      this.subjects = res.data;
      this.service.token = res.data;
      if (this.subjects == null) {
        this.message.success('Đăng nhập thất bại');
      } else {
        this.message.success('Đăng nhập thành công');
        this.service.getInfo(this.user.email).subscribe((res) => {
          this.service.userLogin = res.data;
        });
        this.router.navigate(['./homepage/page']);
        this.homepagecom.isShow = true;
      }
    });

    // this.router.navigate(['./homepage/page']);
  }
}

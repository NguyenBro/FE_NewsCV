import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { user } from './model/news.model';
import { newsService } from './services/news.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.less'],
})
export class HomepageComponent implements OnInit {
  public isShow = false;
  select = '';
  showLogo = true;
  user: user = new user();
  constructor(
    private router: Router,
    private sevices: newsService,
    private route: ActivatedRoute,
    private modal: NzModalService,
    private message: NzMessageService
  ) {
    sevices
      .getLoggedInUser(localStorage.getItem('email') || '')
      .subscribe((user) => {
        if (user.errorCode === null) {
          this.user = user.data;
          console.log('user1131', this.user);
        }
      });
    this.showLogo = true;
    this.isShow = this.user.email === '' ? true : false;
  }
  listNews = ['Học bổng', 'Sự kiện', 'Cuộc thi'];
  news = 'Tin tức';
  ngOnInit(): void {}
  page() {
    this.showLogo = true;
    this.select = 'page';
    this.router.navigate(['./homepage/page']);
  }
  login() {
    this.select = 'login';
    this.router.navigate(['./homepage/login']);
  }
  recruit() {
    this.select = 'recruit';
    this.router.navigate(['./homepage/competence-frames']);
  }
  resign() {
    this.select = 'resign';
    this.router.navigate(['./homepage/resign']);
  }
  info() {
    this.select = 'info';
    this.router.navigate(['./homepage/infomation']);
  }
  company() {
    this.select = 'company';
    this.router.navigate(['./homepage/companys']);
  }
  admin() {
    this.select = 'admin';
    this.router.navigate(['./homepage/administration/Statistical']);
  }
  logout() {
    this.select = '';
    this.modal.warning({
      nzTitle: `Bạn có muốn đăng xuất không?`,
      nzOkDanger: true,
      nzClassName: 'customPopUp warning',
      nzOnOk: () => {
        this.isShow = false;
        this.sevices.logOut();
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        this.router.navigate(['./homepage/login']);
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
  onSelectionChangeNews(event: string) {
    this.select = '';
    if (event === 'Học bổng') {
      console.log(event);
      this.router.navigate(['./homepage/news-scholarship']);
    } else if (event === 'Sự kiện') {
      console.log(event);
      this.router.navigate(['./homepage/news-event']);
    } else if (event === 'Cuộc thi') {
      console.log(event);
      this.router.navigate(['./homepage/news-competion']);
    }
  }
}

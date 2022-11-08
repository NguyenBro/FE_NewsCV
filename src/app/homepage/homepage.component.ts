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
  showLogo = true;
  user: user = new user();
  constructor(
    private router: Router,
    private sevices: newsService,
    private route: ActivatedRoute,
    private modal: NzModalService,
    private message: NzMessageService
  ) {
    this.showLogo = true;
    this.user = sevices.userLogin;
  }
  listNews = ['Học bổng', 'Sự kiện', 'Cuộc thi'];
  news = 'Tin tức';
  ngOnInit(): void {}
  page() {
    this.showLogo = true;
    this.router.navigate(['./homepage/page']);
  }
  login() {
    this.router.navigate(['./homepage/login']);
  }
  recruit() {
    this.router.navigate(['./homepage/competence-frames']);
  }
  resign() {
    this.router.navigate(['./homepage/resign']);
  }
  info() {
    this.router.navigate(['./homepage/infomation']);
  }
  company() {
    this.router.navigate(['./homepage/companys']);
  }
  logout() {
    this.modal.warning({
      nzTitle: `Bạn có muốn đăng xuất không?`,
      nzOkDanger: true,
      nzClassName: 'customPopUp warning',
      nzOnOk: () => {
        this.isShow = false;
        this.router.navigate(['./homepage/page']);
        this.message.success('Đăng xuất thành công');
        return;
      },
      nzOkText: 'Xóa',
      nzCancelText: 'Hủy',
      nzOnCancel: () => {
        return;
      },
    });
  }
  onSelectionChangeNews(event: string) {
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

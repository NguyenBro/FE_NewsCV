import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminService } from './admin/services/admin.service';
import { CompanysService } from './company/services/companys.service';
import { CompetenceFramesService } from './competence-frames/services/competence-frames.service';
import { user } from './model/news.model';
import { NewsEventService } from './news-event/services/news-event.service';
import { NewsScholarshipService } from './news-scholarship/services/news-scholarship.service';
import { NewsCompetionService } from './news/services/news-competion.service';
import { newsService } from './services/news.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.less'],
})
export class HomepageComponent implements OnInit {
  showQt = false;
  public isShow = false;
  select = '';
  showLogo = true;
  user: user = new user();
  constructor(
    private router: Router,
    private sevices: newsService,
    private route: ActivatedRoute,
    private modal: NzModalService,
    private message: NzMessageService,
    //gọi service
    private serviceCompany: CompanysService,
    private serviceEvent: NewsEventService,
    private serviceCompetion: NewsCompetionService,
    private serviceScholarship: NewsScholarshipService,
    private serviceCompetence: CompetenceFramesService,
    private serviceAdmin: AdminService
  ) {
    if (
      localStorage.getItem('role') === 'ADMIN' ||
      localStorage.getItem('role') === 'COMPANY'
    ) {
      this.showQt = true;
    } else {
      this.showQt = false;
    }
  }
  listNews = ['Học bổng', 'Sự kiện', 'Cuộc thi'];
  news = 'Tin tức';
  ngOnInit(): void {
    this.sevices
      .getLoggedInUser(localStorage.getItem('email') || '')
      .subscribe((user) => {
        if (user.errorCode === null) {
          this.user = user.data;
          console.log('user1131', this.user);
          this.isShow = this.user.email === '' ? false : true;
        }
      });
    console.log('role', this.sevices.role);

    this.showLogo = true;
  }
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
        localStorage.removeItem('cv');
        localStorage.removeItem('searchKeyword');
        localStorage.removeItem('role');
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

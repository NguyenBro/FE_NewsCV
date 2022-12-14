import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomepageComponent } from '../homepage.component';
import { AdminService } from './services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less'],
})
export class AdminComponent implements OnInit {
  isCollapsed = false;
  showCompany: boolean;
  constructor(
    private router: Router,
    private homepage: HomepageComponent,
    private service: AdminService
  ) {
    homepage.select = 'admin';
    if (localStorage.getItem('role') === 'COMPANY') {
      this.showCompany = true;
    } else {
      this.showCompany = false;
    }
    this.homepage.showLogo = true;
  }

  ngOnInit(): void {}
  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
  statistical() {
    this.router.navigate(['./homepage/administration/Statistical']);
  }
  JobStatis() {
    this.router.navigate(['./homepage/administration/JobStatis']);
  }
  RecruitStatis() {
    this.router.navigate(['./homepage/administration/RecruitStatis']);
  }
  NewsScholarshipStatis() {
    this.service.typeNews = 'hoc-bong';
    this.router.navigate(['./homepage/administration/NewsScholarshipStatis']);
  }
  NewsCompitionStatis() {
    this.service.typeNews = 'cuoc-thi';
    this.router.navigate(['./homepage/administration/NewsCompitionStatis']);
  }
  NewsEventStatis() {
    this.service.typeNews = 'su-kien';
    this.router.navigate(['./homepage/administration/NewsEventStatis']);
  }
  NewsRecruitStatis() {
    this.service.typeNews = 'tuyen-dung';
    this.router.navigate(['./homepage/administration/NewsJobStatis']);
  }
}

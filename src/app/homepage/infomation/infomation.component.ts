import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HomepageComponent } from '../homepage.component';
import { user } from '../model/news.model';
import { newsService } from '../services/news.service';

@Component({
  selector: 'app-infomation',
  templateUrl: './infomation.component.html',
  styleUrls: ['./infomation.component.less'],
})
export class InfomationComponent implements OnInit {
  user: user = new user();
  constructor(
    private service: newsService,
    private router: Router,
    private homepage: HomepageComponent
  ) {
    homepage.select = 'info';
    this.homepage.showLogo = true;
    service
      .getLoggedInUser(localStorage.getItem('email') || '')
      .subscribe((user) => {
        if (user.errorCode === null) {
          this.user = user.data;
          console.log('user1131', this.user);
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('email');
          localStorage.removeItem('cv');
          localStorage.removeItem('searchKeyword');
          localStorage.removeItem('role');
        }
      });
  }
  ngOnInit(): void {}
}

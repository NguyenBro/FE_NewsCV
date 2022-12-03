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
        }
      });
    // router.events.subscribe((val) => {
    //   if (val instanceof NavigationEnd) {
    //     if (val.url === '/homepage/login') {
    //       service
    //         .getLoggedInUser(localStorage.getItem('email') || '')
    //         .subscribe((user) => {
    //           if (user.errorCode === null) {
    //             this.service.userLogin = user.data;
    //             console.log('user1131', this.service.userLogin);
    //             this.router.navigate(['./homepage/page']);
    //           }
    //         });
    //     } else {
    //       service
    //         .getLoggedInUser(localStorage.getItem('email') || '')
    //         .subscribe((user) => {
    //           if (user.errorCode === null) {
    //             this.service.userLogin = user.data;
    //             console.log('user1133', this.service.userLogin);
    //           }
    //         });
    //     }
    //   }
    // });
  }
  ngOnInit(): void {}
}

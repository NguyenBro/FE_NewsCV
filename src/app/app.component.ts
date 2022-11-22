import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { newsService } from './homepage/services/news.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'newCv';
  constructor(private service: newsService, private router: Router) {
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
}

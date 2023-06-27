import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomepageComponent } from '../homepage.component';
import { newsService } from '../services/news.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.less'],
})
export class PageComponent implements OnInit {
  array: string[] = [];
  constructor(
    private router: Router,
    private sevices: newsService,
    private homepagecom: HomepageComponent
  ) {
    this.homepagecom.loadData();
    sevices.getAllAdvert().subscribe((res) => {
      for (let i = 0; i < res.data.length; i++) {
        this.array.push(res.data[i].image);
      }
    });
  }

  ngOnInit(): void {}

  create() {
    this.router.navigate(['./homepage/create-news']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { HomepageComponent } from '../homepage.component';
import { scholarship } from '../model/news.model';
import { newsService } from '../services/news.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.less'],
})
export class PageComponent implements OnInit {
  constructor(
    private router: Router,
    private sevices: newsService,
    private homepagecom: HomepageComponent
  ) {
    this.homepagecom.loadData();
  }

  ngOnInit(): void {}

  create() {
    this.router.navigate(['./homepage/create-news']);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, mergeMap, of, tap } from 'rxjs';
import { PackageService } from '../packages.service';
import { Subscription } from 'src/app/homepage/model/news.model';
import { newsService } from 'src/app/homepage/services/news.service';

@Component({
  selector: 'app-sign-pack',
  templateUrl: './sign-pack.component.html',
  styleUrls: ['./sign-pack.component.less'],
})
export class SignPackComponent implements OnInit {
  public infoPack: Subscription | undefined = new Subscription();
  link = '';
  codeCompay = '';
  constructor(
    private Newsservice: newsService,
    private router: Router,
    private route: ActivatedRoute,
    private service: PackageService
  ) {
    this.codeCompay =
      localStorage
        .getItem('email')
        ?.slice(0, localStorage.getItem('email')?.indexOf('@')) || '';
    console.log(
      'packageId$',
      this.route.snapshot.paramMap.get('packageId')?.toString()
    );
    this.service
      .getSubscriptionByCode(
        this.route.snapshot.paramMap.get('packageId')?.toString()
      )
      .subscribe((res) => {
        this.infoPack = res.data;
        console.log('infoPack', this.infoPack);
      });
  }

  ngOnInit(): void {}
  Packages() {
    this.router.navigate(['./Business/Packages']);
  }
  click() {
    this.service
      .getPay(
        this.codeCompay,
        this.infoPack?.code,
        this.infoPack?.price.toString()
      )
      .subscribe((res) => {
        console.log('link', res);
        this.link = res;
      });
  }
}

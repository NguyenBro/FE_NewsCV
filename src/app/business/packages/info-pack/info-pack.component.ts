import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PackageService } from '../packages.service';
import { Subscription } from 'src/app/homepage/model/news.model';

@Component({
  selector: 'app-info-pack',
  templateUrl: './info-pack.component.html',
  styleUrls: ['./info-pack.component.less']
})
export class InfoPackComponent implements OnInit {
  listSub: Subscription[] = [];
  constructor(
    private router: Router,
    private services: PackageService,
    ) {  
    this.services
      .getAllSubscription()
      .subscribe((sub) => {
        this.listSub=sub.data;
      });
   }

  ngOnInit(): void {
  }
  SignPack(code:string) {
    this.router.navigate(['./Business/Packages/'+code]);
  }
}

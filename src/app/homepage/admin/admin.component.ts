import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less'],
})
export class AdminComponent implements OnInit {
  isCollapsed = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}
  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
  statistical() {
    this.router.navigate(['./homepage/administration/Statistical']);
  }
}

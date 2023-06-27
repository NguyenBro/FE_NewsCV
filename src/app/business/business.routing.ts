import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BusinessComponent } from './business.component';
import { PageComponent } from './page/page.component';
import { ResignComponent } from './resign/resign.component';
import { LoginComponent } from './login/login.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AdvertComponent } from './advert/advert.component';
import { TransHisComComponent } from './TransHisCom/trans-his-com.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: BusinessComponent,
        data: {
          title: 'Tất cả ứng viên',
        },
        children: [
          {
            path: 'Page',
            component: PageComponent,
          },
          {
            path: 'Resign',
            component: ResignComponent,
          },
          {
            path: 'Login',
            component: LoginComponent,
          },
          {
            path: 'StatisticsPackages',
            component: StatisticsComponent,
          },
          {
            path: 'TransHisCom',
            component: TransHisComComponent,
          },
          {
            path: 'Advertisement',
            component: AdvertComponent,
          },
          {
            path: 'Packages',
            loadChildren: () =>
              import('./packages/packages.module').then(
                (m) => m.PackagesModule
              ),
          },
          {
            path: 'Schedule-Interview',
            loadChildren: () =>
              import('./schedule-interview/schedule-interview.module').then(
                (m) => m.ScheduleInterviewModule
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class BusinessRoutingModule {}

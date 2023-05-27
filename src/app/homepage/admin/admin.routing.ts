import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { RecruitStatisComponent } from './recruit-statis/recruit-statis.component';
import { StatisticalComponent } from './statistical/statistical.component';
import { NewsStatisComponent } from './news-statis/news-statis.component';
import { JobStatisComponent } from './job-statis/job-statis.component';
import { CompanyStatisComponent } from './company-statis/company-statis.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AdminComponent,
        data: {
          title: 'Tất cả khung năng lực',
        },
        children: [
          {
            path: 'Statistical',
            component: StatisticalComponent,
          },
          {
            path: 'RecruitStatis',
            component: RecruitStatisComponent,
          },
          {
            path: 'NewsScholarshipStatis',
            component: NewsStatisComponent,
          },
          {
            path: 'NewsCompitionStatis',
            component: NewsStatisComponent,
          },
          {
            path: 'NewsEventStatis',
            component: NewsStatisComponent,
          },
          {
            path: 'NewsJobStatis',
            component: NewsStatisComponent,
          },
          {
            path: 'JobStatis',
            component: JobStatisComponent,
          },
          {
            path: 'ComStatis',
            component: CompanyStatisComponent,
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

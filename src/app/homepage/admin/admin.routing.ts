import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { RecruitStatisComponent } from './recruit-statis/recruit-statis.component';
import { StatisticalComponent } from './statistical/statistical.component';

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
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

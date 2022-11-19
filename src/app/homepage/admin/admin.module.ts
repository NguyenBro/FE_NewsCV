import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.routing';
import { AdminComponent } from './admin.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RecruitStatisComponent } from './recruit-statis/recruit-statis.component';
import { StatisticalComponent } from './statistical/statistical.component';

@NgModule({
  declarations: [AdminComponent, RecruitStatisComponent, StatisticalComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NzMenuModule,
    NzToolTipModule,
    NzIconModule,
  ],
})
export class AdminModule {}

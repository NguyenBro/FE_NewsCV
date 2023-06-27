import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessRoutingModule } from './business.routing';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PageComponent } from './page/page.component';
import { LoginComponent } from './login/login.component';
import { ResignComponent } from './resign/resign.component';
import { SharedModule } from '../shared/styles/shared.module';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { BusinessComponent } from './business.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { AdvertComponent } from './advert/advert.component';
import { TransHisComComponent } from './TransHisCom/trans-his-com.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NgxEchartsModule } from 'ngx-echarts';
import { ChartComponent } from '../shared/styles/chart/chart.component';

@NgModule({
  declarations: [
    BusinessComponent,
    PageComponent,
    LoginComponent,
    ResignComponent,
    StatisticsComponent,
    AdvertComponent,
    TransHisComComponent,
  ],
  imports: [
    ChartComponent,
    CommonModule,
    BusinessRoutingModule,
    NzMenuModule,
    NzIconModule,
    SharedModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzCheckboxModule,
    NzToolTipModule,
    NzStatisticModule,
    NzCardModule,
    NzTableModule,
    NzDividerModule,
    NzTabsModule,
    NzDatePickerModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
})
export class BusinessModule {}

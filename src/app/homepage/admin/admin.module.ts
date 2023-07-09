import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.routing';
import { AdminComponent } from './admin.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RecruitStatisComponent } from './recruit-statis/recruit-statis.component';
import { StatisticalComponent } from './statistical/statistical.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NewsStatisComponent } from './news-statis/news-statis.component';
import { CompanyStatisComponent } from './company-statis/company-statis.component';
import { JobStatisComponent } from './job-statis/job-statis.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NgxEchartsModule } from 'ngx-echarts';
@NgModule({
  declarations: [
    AdminComponent,
    RecruitStatisComponent,
    StatisticalComponent,
    NewsStatisComponent,
    CompanyStatisComponent,
    JobStatisComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NzMenuModule,
    NzToolTipModule,
    NzIconModule,
    NzDropDownModule,
    NzSpinModule,
    NzAlertModule,
    NzButtonModule,
    PdfViewerModule,
    NzTableModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
})
export class AdminModule {}

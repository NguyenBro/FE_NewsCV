import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageRoutingModule } from './homepage.routing';
import { PageComponent } from './page/page.component';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { SharedModule } from '../shared/styles/shared.module';
import { NzOverlayModule } from 'ng-zorro-antd/core/overlay';
import { CompetenceFrameModule } from './competence-frames/competence-frames.module';

import { UiCommonModule } from '../shared/lib/ui-common.module';
import { LoginComponent } from './login/login.component';
import { ResignComponent } from './resign/resign.component';
import { HomepageComponent } from './homepage.component';
import { AdminComponent } from './admin/admin.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { InfomationModule } from './infomation/infomation.module';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CreateNewsComponent } from './create-news/create-news.component';

import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';

@NgModule({
  declarations: [
    PageComponent,
    LoginComponent,
    ResignComponent,
    HomepageComponent,
    CreateNewsComponent,
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    NzPaginationModule,
    NzInputModule,
    NzDropDownModule,
    SharedModule,
    NzOverlayModule,
    CompetenceFrameModule,
    UiCommonModule,
    NzMenuModule,
    NzToolTipModule,
    NzIconModule,
    NzSpinModule,
    NzAlertModule,
    InfomationModule,
    NzListModule,
    NzGridModule,
    NzTabsModule,
    NzCardModule,
    PdfViewerModule,
    FormsModule,
    NzDatePickerModule,
    QuillModule.forRoot(),
    NzCarouselModule,
  ],
})
export class HomepageModule {}

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
import { NzRateModule } from 'ng-zorro-antd/rate';
import { InfomationComponent } from './infomation/infomation.component';
import { UiCommonModule } from '../shared/lib/ui-common.module';
import { LoginComponent } from './login/login.component';
import { ResignComponent } from './resign/resign.component';
import { HomepageComponent } from './homepage.component';

@NgModule({
  declarations: [
    PageComponent,
    InfomationComponent,
    LoginComponent,
    ResignComponent,
    HomepageComponent,
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
    NzRateModule,
    UiCommonModule,
  ],
})
export class HomepageModule {}

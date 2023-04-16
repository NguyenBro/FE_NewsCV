import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfomationRoutingModule } from './infomation.routing';
import { InfomationComponent } from './infomation.component';
import { ListedComponent } from './listed/listed.component';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { FormsModule } from '@angular/forms';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
@NgModule({
  declarations: [InfomationComponent, ListedComponent],
  imports: [
    CommonModule,
    InfomationRoutingModule,
    NzRateModule,
    FormsModule,
    NzPopoverModule,
    PdfViewerModule,
    NzSwitchModule,
    NzModalModule,
    NzButtonModule,
    NzCheckboxModule
  ],
})
export class InfomationModule {}

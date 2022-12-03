import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfomationRoutingModule } from './infomation.routing';
import { InfomationComponent } from './infomation.component';
import { ListedComponent } from './listed/listed.component';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [InfomationComponent, ListedComponent],
  imports: [CommonModule, InfomationRoutingModule, NzRateModule, FormsModule],
})
export class InfomationModule {}

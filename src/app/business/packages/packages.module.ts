import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackagesRoutingModule } from './packages.routing';
import { SignPackComponent } from './sign-pack/sign-pack.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { InfoPackComponent } from './info-pack/info-pack.component';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
@NgModule({
  declarations: [
    SignPackComponent,
    InfoPackComponent,
  ],
  imports: [
    CommonModule,
    PackagesRoutingModule,
    NzCardModule,
    NzGridModule,
    NzButtonModule,
    NzTypographyModule,
    NzCollapseModule,
  ]
})
export class PackagesModule { }

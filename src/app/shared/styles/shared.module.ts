import { NgModule } from '@angular/core';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ButtonDropdownComponent } from './button-dropdown/button-dropdown.component';
import { ButtonDropdownModule } from './button-dropdown/button-dropdown.module';
import { ContainerLayoutModule } from './container-layout/container-layout.module';
import { DropdownTreeSelectModule } from './dropdown-tree-select/dropdown-tree-select.module';
import { FooterModule } from './footer/footer.module';
import { RightSideModule } from './right-side/right-side.module';
import { SearchBarModule } from './search-bar/search-bar.module';
import { SectionModule } from './section/section.module';
import { SubSectionModule } from './sub-section/sub-section.module';
import { ContainerLayoutComponent } from './container-layout/container-layout.component';
import { DropdownTreeSelectComponent } from './dropdown-tree-select/dropdown-tree-select.component';
import { FooterComponent } from './footer/footer.component';
import { RightSideComponent } from './right-side/right-side.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SectionComponent } from './section/section.component';
import { SubSectionComponent } from './sub-section/sub-section.component';
import { ContainerLayoutWModule } from './container-layout-w/container-layout-w.module';
import { ContainerLayoutWComponent } from './container-layout-w/container-layout-w.component';
import { NgxEchartsModule } from 'ngx-echarts';
@NgModule({
  declarations: [DropdownComponent],
  imports: [
    NzMessageModule,
    NzDropDownModule,
    FormsModule,
    CommonModule,
    ButtonDropdownModule,
    ContainerLayoutModule,
    ContainerLayoutWModule,
    DropdownTreeSelectModule,
    FooterModule,
    RightSideModule,
    SearchBarModule,
    SectionModule,
    SubSectionModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  exports: [
    NzMessageModule,
    NzDropDownModule,
    FormsModule,
    CommonModule,
    NzPopoverModule,
    NzModalModule,
    DropdownComponent,
    ButtonDropdownComponent,
    ContainerLayoutComponent,
    ContainerLayoutWComponent,
    DropdownTreeSelectComponent,
    FooterComponent,
    RightSideComponent,
    SearchBarComponent,
    SectionComponent,
    SubSectionComponent,
  ],
})
export class SharedModule {}

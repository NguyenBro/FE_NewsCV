import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { UiCommonModule } from 'src/app/shared/lib/ui-common.module';
import { ButtonDropdownModule } from 'src/app/shared/styles/button-dropdown/button-dropdown.module';
import { ContainerLayoutModule } from 'src/app/shared/styles/container-layout/container-layout.module';
import { FooterModule } from 'src/app/shared/styles/footer/footer.module';
import { RightSideModule } from 'src/app/shared/styles/right-side/right-side.module';
import { SearchBarModule } from 'src/app/shared/styles/search-bar/search-bar.module';
import { SectionModule } from 'src/app/shared/styles/section/section.module';
import { NewsScholarshipFormComponent } from './news-scholarship-form/news-scholarship-form.component';
import { NewsScholarshipViewComponent } from './news-scholarship-view/news-scholarship-view.component';
import { NewsScholarshipRoutingModule } from './news-scholarship.routing';
import { NewsScholarshipEntryComponent } from './news-scholarship-entry/news-scholarship-entry.component';
import { ContainerLayoutWModule } from 'src/app/shared/styles/container-layout-w/container-layout-w.module';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
@NgModule({
  declarations: [
    NewsScholarshipEntryComponent,
    NewsScholarshipViewComponent,
    NewsScholarshipFormComponent,
  ],
  imports: [
    CommonModule,
    RightSideModule,
    SearchBarModule,
    FooterModule,
    ContainerLayoutModule,
    ContainerLayoutWModule,
    NewsScholarshipRoutingModule,
    NzLayoutModule,
    NzModalModule,
    PdfViewerModule,
    NzProgressModule,
    NzTimelineModule,
    NzTableModule,
    NzTagModule,
    NzSelectModule,
    NzPaginationModule,
    NzInputModule,
    DragDropModule,
    NzMessageModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzPopoverModule,
    SectionModule,
    UiCommonModule,
    ButtonDropdownModule,
    NzCommentModule,
    NzButtonModule,
    NzListModule,
    NzAvatarModule,
  ],
})
export class NewsScholarshipModule {}

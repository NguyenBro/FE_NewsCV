import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { ListScheduleComponent } from './list-schedule/list-schedule.component';
import { ScheduleInterviewRoutingModule } from './schedule-interview.routing';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ListDateComponent } from './list-date/list-date.component';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { ModalComponent } from 'src/app/shared/styles/modal/modal.component';
@NgModule({
  declarations: [CreateComponent, ListScheduleComponent, ListDateComponent],
  imports: [
    CommonModule,
    ScheduleInterviewRoutingModule,
    NzCalendarModule,
    NzBadgeModule,
    NzModalModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    FormsModule,
    ReactiveFormsModule,
    NzTypographyModule,
    NzDatePickerModule,
    NzIconModule,
    NzRadioModule,

    ModalComponent,
  ],
})
export class ScheduleInterviewModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListScheduleComponent } from './list-schedule/list-schedule.component';
import { CreateComponent } from './create/create.component';
import { ListDateComponent } from './list-date/list-date.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'Schedules',
        component: ListScheduleComponent,
        data: {
          title: 'Tất cả khung năng lực',
        },
      },
      {
        path: 'Create-Schedule',
        component: CreateComponent,
      },
      {
        path: ':scheduleId',
        component: ListDateComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ScheduleInterviewRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NewsEventFormComponent } from './news-event-form/news-event-form.component';
import { NewsEventViewComponent } from './news-event-view/news-event-view.component';
import { NewsEventEntryComponent } from './news-event-entry/news-event-entry.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: NewsEventEntryComponent,
        data: {
          title: 'Tất cả khung năng lực',
        },
        children: [
          {
            path: 'create',
            component: NewsEventFormComponent,
          },
          {
            path: ':comFrameId',
            children: [
              {
                path: '',
                component: NewsEventViewComponent,
              },
              {
                path: 'edit',
                component: NewsEventFormComponent,
              },
            ],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class NewsEventRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NewsScholarshipFormComponent } from './news-scholarship-form/news-scholarship-form.component';
import { NewsScholarshipViewComponent } from './news-scholarship-view/news-scholarship-view.component';
import { NewsScholarshipEntryComponent } from './news-scholarship-entry/news-scholarship-entry.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: NewsScholarshipEntryComponent,
        data: {
          title: 'Tất cả khung năng lực',
        },
        children: [
          {
            path: 'create',
            component: NewsScholarshipFormComponent,
          },
          {
            path: ':comFrameId',
            children: [
              {
                path: '',
                component: NewsScholarshipViewComponent,
              },
              {
                path: 'edit',
                component: NewsScholarshipFormComponent,
              },
            ],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class NewsScholarshipRoutingModule {}

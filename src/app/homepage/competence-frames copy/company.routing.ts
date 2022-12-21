import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CompanyFormComponent } from './company-form/company-form.component';
import { CompanyViewComponent } from './company-view/company-view.component';
import { CompanyEntryComponent } from './company-entry/company-entry.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: CompanyEntryComponent,
        data: {
          title: 'Tất cả khung năng lực',
        },
        children: [
          {
            path: 'create',
            component: CompanyFormComponent,
          },
          {
            path: ':comFrameId',
            children: [
              {
                path: '',
                component: CompanyViewComponent,
              },
              {
                path: 'edit',
                component: CompanyFormComponent,
              },
            ],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class CompetenceFrameRoutingModule {}

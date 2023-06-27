import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AutoFindAppliEntryComponent } from './auto-find-appli-entry/auto-find-appli-entry.component';
import { AutoFindAppliFormComponent } from './auto-find-appli-form/auto-find-appli-form.component';
import { AutoFindAppliViewComponent } from './auto-find-appli-view/auto-find-appli-view.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AutoFindAppliEntryComponent,
        data: {
          title: 'Tất cả ứng viên',
        },
        children: [
          {
            path: 'create',
            component: AutoFindAppliFormComponent,
          },
          {
            path: ':comFrameId',
            children: [
              {
                path: '',
                component: AutoFindAppliViewComponent,
                // component: CompanyDetailComponent,
              },
              {
                path: 'edit',
                component: AutoFindAppliFormComponent,
              },
            ],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AutoFindAppliRoutingModule {}

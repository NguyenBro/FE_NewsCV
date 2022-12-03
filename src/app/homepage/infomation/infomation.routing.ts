import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InfomationComponent } from './infomation.component';
import { ListedComponent } from './listed/listed.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: InfomationComponent,
        data: {
          title: 'Tất cả khung năng lực',
        },
        children: [
          {
            path: 'list-info',
            component: ListedComponent,
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class InfomationRoutingModule {}

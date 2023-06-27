import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignPackComponent } from './sign-pack/sign-pack.component';
import { InfoPackComponent } from './info-pack/info-pack.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: InfoPackComponent,
        data: {
          title: 'Tất cả khung năng lực',
        },
      },
      {
        path: ':packageId',
        component: SignPackComponent,
      },
      
    ]),
  ],
  exports: [RouterModule],
})
export class PackagesRoutingModule {}

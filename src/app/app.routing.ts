import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'homepage/page',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: AppComponent,
      },
      {
        path: 'homepage',
        loadChildren: () =>
          import('./homepage/homepage.module').then((m) => m.HomepageModule),
        // children: [
        //   {
        //     path: 'homepage',
        //     component: HomepageComponent,
        //   },
        // ],
      },
      {
        path: 'Business',
        loadChildren: () =>
          import('./business/business.module').then((m) => m.BusinessModule),
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CreateNewsComponent } from './create-news/create-news.component';
import { HomepageComponent } from './homepage.component';
import { InfomationComponent } from './infomation/infomation.component';
import { LoginComponent } from './login/login.component';

import { PageComponent } from './page/page.component';
import { PayMentComponent } from './pay-ment/pay-ment.component';
import { ResignComponent } from './resign/resign.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: HomepageComponent,
        children: [
          {
            path: 'page',
            component: PageComponent,
          },
          {
            path: 'login',
            component: LoginComponent,
          },
          {
            path: 'resign',
            component: ResignComponent,
          },
          {
            path: 'create-news',
            component: CreateNewsComponent,
          },
          {
            path: 'pay-ment',
            component: PayMentComponent,
          },
          {
            path: 'AutoFindAppli',
            loadChildren: () =>
              import('./auto-find-appli/auto-find-appli.module').then(
                (m) => m.AutoFindAppliModule
              ),
          },
          {
            path: 'infomation',
            loadChildren: () =>
              import('./infomation/infomation.module').then(
                (m) => m.InfomationModule
              ),
          },
          {
            path: 'administration',
            loadChildren: () =>
              import('./admin/admin.module').then((m) => m.AdminModule),
          },
          {
            path: 'competence-frames',
            loadChildren: () =>
              import('./competence-frames/competence-frames.module').then(
                (m) => m.CompetenceFrameModule
              ),
          },
          {
            path: 'news-competion',
            loadChildren: () =>
              import('./news/news.module').then((m) => m.NewsModule),
          },
          {
            path: 'news-scholarship',
            loadChildren: () =>
              import('./news-scholarship/news-scholarship.module').then(
                (m) => m.NewsScholarshipModule
              ),
          },
          {
            path: 'news-event',
            loadChildren: () =>
              import('./news-event/news-event.module').then(
                (m) => m.NewsEventModule
              ),
          },
          {
            path: 'companys',
            loadChildren: () =>
              import('./company/companys.module').then((m) => m.CompanysModule),
          },

        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class HomepageRoutingModule {}

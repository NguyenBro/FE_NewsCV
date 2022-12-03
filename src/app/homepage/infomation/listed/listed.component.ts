import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, map, Subscription } from 'rxjs';
import { user } from '../../model/news.model';
import { newsService } from '../../services/news.service';
import { InfomationComponent } from '../infomation.component';
import { InfomationService } from '../infomation.service';

@Component({
  selector: 'app-listed',
  templateUrl: './listed.component.html',
  styleUrls: ['./listed.component.less'],
})
export class ListedComponent implements OnInit {
  // public listInterview: interview[] = [];
  public selectedTab = 'news';
  public htmlContent =
    '<h3><strong>This is a title</strong></h3><br><p>This is a title Gastropub chillwave lumbersexual umami lyft. Poke austin direct trade, marfa raclette letterpress actually. Chartreuse sriracha pinterest twee lo-fi try-hard. Meditation banh mi kitsch, prism organic hot chicken literally heirloom occupy af semiotics food truck. Aesthetic asymmetrical gluten-free, health goth shaman meh lumbersexual bespoke kinfolk helvetica vaporware fashion axe freegan. Pour-over hammock succulents disrupt chartreuse raw denim. Brunch aesthetic fanny pack subway tile everyday carry green juice neutra beard cray small batch poke yuccie plaid pork belly. Blue bottle 8-bit flexitarian hashtag. Scenester marfa yuccie snackwave edison bulb. VHS blog pickled scenester venmo hashtag lo-fi.</p>';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public quillEditor: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private quillConfig: any = {
    bold: false,
    italic: false,
    underline: false,
    strike: false,
    script: '',
    align: '',
    list: '',
    link: false,
    undo: false,
    redo: false,
  };
  public isCenter = false;
  user: user = new user();
  subscriptions = new Subscription();
  private listOfSearches$ = new BehaviorSubject<string[]>([]);
  private pageIndex$ = new BehaviorSubject(1);
  private pageSize$ = new BehaviorSubject(15);
  private refreshBehavior$ = this.service.getRefresh();
  //job-waiting
  private listJobW$ = this.service
    .getApplicationByUser(this.user.id.toString(), 'Waiting')
    .pipe(map((data) => data.data));
  public listJobWapplice$ = combineLatest({
    listOfCompetences: this.listJobW$,
    pageIndex: this.pageIndex$,
    pageSize: this.pageSize$,
    searches: this.listOfSearches$,
    refresh: this.refreshBehavior$,
  }).pipe(
    map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
      listOfCompetences
        // .filter((competence) => this.isSearchCompetence(competence, searches))
        .slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
    )
  );
  //job-Done
  private listJobD$ = this.service
    .getApplicationByUser(this.user.id.toString(), 'Done')
    .pipe(map((data) => data.data));
  public listJobDapplice$ = combineLatest({
    listOfCompetences: this.listJobD$,
    pageIndex: this.pageIndex$,
    pageSize: this.pageSize$,
    searches: this.listOfSearches$,
    refresh: this.refreshBehavior$,
  }).pipe(
    map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
      listOfCompetences
        // .filter((competence) => this.isSearchCompetence(competence, searches))
        .slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
    )
  );
  //cv-Waiting
  private listCVW$ = this.service
    .getCVUserByStatus(this.user.id.toString(), 'Waiting')
    .pipe(map((data) => data.data));
  public listCVWapplice$ = combineLatest({
    listOfCompetences: this.listCVW$,
    pageIndex: this.pageIndex$,
    pageSize: this.pageSize$,
    searches: this.listOfSearches$,
    refresh: this.refreshBehavior$,
  }).pipe(
    map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
      listOfCompetences
        // .filter((competence) => this.isSearchCompetence(competence, searches))
        .slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
    )
  );
  //cv-Done
  private listCVD$ = this.service
    .getCVUserByStatus(this.user.id.toString(), 'Done')
    .pipe(map((data) => data.data));
  public listCVDapplice$ = combineLatest({
    listOfCompetences: this.listCVD$,
    pageIndex: this.pageIndex$,
    pageSize: this.pageSize$,
    searches: this.listOfSearches$,
    refresh: this.refreshBehavior$,
  }).pipe(
    map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
      listOfCompetences
        // .filter((competence) => this.isSearchCompetence(competence, searches))
        .slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
    )
  );
  //newsHB
  private listNewsHB$ = this.service
    .getInteractiveNewsById(this.user.id.toString(), 'hoc-bong')
    .pipe(map((data) => data.data));
  public listNewsHBapplice$ = combineLatest({
    listOfCompetences: this.listNewsHB$,
    pageIndex: this.pageIndex$,
    pageSize: this.pageSize$,
    searches: this.listOfSearches$,
    refresh: this.refreshBehavior$,
  }).pipe(
    map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
      listOfCompetences
        // .filter((competence) => this.isSearchCompetence(competence, searches))
        .slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
    )
  );
  //newsSK
  private listNewsSK$ = this.service
    .getInteractiveNewsById(this.user.id.toString(), 'su-kien')
    .pipe(map((data) => data.data));
  public listNewsSKapplice$ = combineLatest({
    listOfCompetences: this.listNewsSK$,
    pageIndex: this.pageIndex$,
    pageSize: this.pageSize$,
    searches: this.listOfSearches$,
    refresh: this.refreshBehavior$,
  }).pipe(
    map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
      listOfCompetences
        // .filter((competence) => this.isSearchCompetence(competence, searches))
        .slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
    )
  );
  //newsCT
  private listNewsCT$ = this.service
    .getInteractiveNewsById(this.user.id.toString(), 'cuoc-thi')
    .pipe(map((data) => data.data));
  public listNewsCTapplice$ = combineLatest({
    listOfCompetences: this.listNewsCT$,
    pageIndex: this.pageIndex$,
    pageSize: this.pageSize$,
    searches: this.listOfSearches$,
    refresh: this.refreshBehavior$,
  }).pipe(
    map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
      listOfCompetences
        // .filter((competence) => this.isSearchCompetence(competence, searches))
        .slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
    )
  );

  constructor(
    private router: Router,
    private newsService: newsService,
    private service: InfomationService
  ) {
    newsService
      .getLoggedInUser(localStorage.getItem('email') || '')
      .subscribe((user) => {
        if (user.errorCode === null) {
          this.user = user.data;
          console.log('user1131', this.user);
          console.log('this.info.user.id.toString()', this.user.id);
          //job-Waiting
          this.listJobW$ = this.service
            .getApplicationByUser(this.user.id.toString(), 'Waiting')
            .pipe(map((data) => data.data));
          this.listJobWapplice$ = combineLatest({
            listOfCompetences: this.listJobW$,
            pageIndex: this.pageIndex$,
            pageSize: this.pageSize$,
            searches: this.listOfSearches$,
            refresh: this.refreshBehavior$,
          }).pipe(
            map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
              listOfCompetences
                // .filter((competence) => this.isSearchCompetence(competence, searches))
                .slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
            )
          );
          //job-Done
          this.listJobD$ = this.service
            .getApplicationByUser(this.user.id.toString(), 'Done')
            .pipe(map((data) => data.data));
          this.listJobDapplice$ = combineLatest({
            listOfCompetences: this.listJobW$,
            pageIndex: this.pageIndex$,
            pageSize: this.pageSize$,
            searches: this.listOfSearches$,
            refresh: this.refreshBehavior$,
          }).pipe(
            map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
              listOfCompetences
                // .filter((competence) => this.isSearchCompetence(competence, searches))
                .slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
            )
          );
          //cv-Waiting
          this.listCVW$ = this.service
            .getCVUserByStatus(this.user.id.toString(), 'Waiting')
            .pipe(map((data) => data.data));
          this.listCVWapplice$ = combineLatest({
            listOfCompetences: this.listCVW$,
            pageIndex: this.pageIndex$,
            pageSize: this.pageSize$,
            searches: this.listOfSearches$,
            refresh: this.refreshBehavior$,
          }).pipe(
            map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
              listOfCompetences
                // .filter((competence) => this.isSearchCompetence(competence, searches))
                .slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
            )
          );
          //cv-Done
          this.listCVD$ = this.service
            .getCVUserByStatus(this.user.id.toString(), 'Done')
            .pipe(map((data) => data.data));
          this.listCVDapplice$ = combineLatest({
            listOfCompetences: this.listCVD$,
            pageIndex: this.pageIndex$,
            pageSize: this.pageSize$,
            searches: this.listOfSearches$,
            refresh: this.refreshBehavior$,
          }).pipe(
            map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
              listOfCompetences
                // .filter((competence) => this.isSearchCompetence(competence, searches))
                .slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
            )
          );
          //newsHB
          this.listNewsHB$ = this.service
            .getInteractiveNewsById(this.user.id.toString(), 'hoc-bong')
            .pipe(map((data) => data.data));
          this.listNewsHBapplice$ = combineLatest({
            listOfCompetences: this.listNewsHB$,
            pageIndex: this.pageIndex$,
            pageSize: this.pageSize$,
            searches: this.listOfSearches$,
            refresh: this.refreshBehavior$,
          }).pipe(
            map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
              listOfCompetences
                // .filter((competence) => this.isSearchCompetence(competence, searches))
                .slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
            )
          );
          //newsSK
          this.listNewsSK$ = this.service
            .getInteractiveNewsById(this.user.id.toString(), 'su-kien')
            .pipe(map((data) => data.data));
          this.listNewsSKapplice$ = combineLatest({
            listOfCompetences: this.listNewsSK$,
            pageIndex: this.pageIndex$,
            pageSize: this.pageSize$,
            searches: this.listOfSearches$,
            refresh: this.refreshBehavior$,
          }).pipe(
            map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
              listOfCompetences
                // .filter((competence) => this.isSearchCompetence(competence, searches))
                .slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
            )
          );
          //newsCT
          this.listNewsCT$ = this.service
            .getInteractiveNewsById(this.user.id.toString(), 'cuoc-thi')
            .pipe(map((data) => data.data));
          this.listNewsCTapplice$ = combineLatest({
            listOfCompetences: this.listNewsCT$,
            pageIndex: this.pageIndex$,
            pageSize: this.pageSize$,
            searches: this.listOfSearches$,
            refresh: this.refreshBehavior$,
          }).pipe(
            map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
              listOfCompetences
                // .filter((competence) => this.isSearchCompetence(competence, searches))
                .slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
            )
          );
        }
      });
  }
  ngOnInit(): void {}

  public toggleTab(selectedTab: string): void {
    this.selectedTab = selectedTab;
  }

  public fql(name: string, value?: string): void {
    console.log('this.htmlContent', this.htmlContent);

    if (value === undefined) {
      this.quillConfig[name] = !this.quillConfig[name];
      this.quillEditor.format(name, this.quillConfig[name]);
      return;
    }

    if (name === 'script' || name === 'list')
      if (this.quillConfig[name] === value) {
        this.quillConfig[name] = '';
        this.quillEditor.format(name, '');
        return;
      }

    if (name === 'undo') {
      this.quillConfig[name] === true;
      this.quillEditor.history.undo();
      this.quillConfig[name] === false;
      return;
    }
    if (name === 'redo') {
      this.quillConfig[name] === true;
      this.quillEditor.history.redo();
      this.quillConfig[name] === false;
      return;
    }

    this.quillConfig[name] = value;
    this.quillEditor.format(name, value);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public updateQuillConfig(value: any): void {
    this.quillConfig = this.quillEditor.getFormat(value.range);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateText(event: any) {
    console.log('log event: ', event);
    if (event && event.event && event.event === 'text-change') {
      this.htmlContent = event.html ? event.html : this.htmlContent;
    }
  }
  createInterview() {
    this.router.navigate(['./recruit/create']);
  }
}

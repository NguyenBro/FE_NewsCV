import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import {
  BehaviorSubject,
  combineLatest,
  map,
  mergeMap,
  Observable,
  tap,
} from 'rxjs';
import {
  Application,
  Company,
  Recruit,
  ResponseObject,
  user,
} from '../../model/news.model';
import { CompanyEntryComponent } from '../company-entry/company-entry.component';
import { CompanyService } from '../services/company';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { newsService } from '../../services/news.service';

@Component({
  selector: 'app-competence-frame-view',
  templateUrl: './company-view.component.html',
  styleUrls: ['./company-view.component.less'],
})
export class CompanyViewComponent implements OnInit, AfterViewInit {
  public user: user = new user();
  showQt: boolean;
  showUs: boolean;
  public apply: Application = new Application();
  public quillEditor: any;
  public htmlContent =
    '<h3><strong>This is a title</strong></h3><br><p>This is a title Gastropub chillwave lumbersexual umami lyft. Poke austin direct trade, marfa raclette letterpress actually. Chartreuse sriracha pinterest twee lo-fi try-hard. Meditation banh mi kitsch, prism organic hot chicken literally heirloom occupy af semiotics food truck. Aesthetic asymmetrical gluten-free, health goth shaman meh lumbersexual bespoke kinfolk helvetica vaporware fashion axe freegan. Pour-over hammock succulents disrupt chartreuse raw denim. Brunch aesthetic fanny pack subway tile everyday carry green juice neutra beard cray small batch poke yuccie plaid pork belly. Blue bottle 8-bit flexitarian hashtag. Scenester marfa yuccie snackwave edison bulb. VHS blog pickled scenester venmo hashtag lo-fi.</p>';
  imageObj: File | undefined;
  isVisible = false;
  isConfirmLoading = false;
  img =
    'https://firebasestorage.googleapis.com/v0/b/newscv-3595e.appspot.com/o/cf76fb34-a0ec-45f2-9dcd-2e333754b0d1png?alt=media';
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
  public listJobOfCompany$: Observable<Recruit[]> = new Observable<Recruit[]>();
  private listOfSearches$ = new BehaviorSubject<string[]>([]);
  private pageIndex$ = new BehaviorSubject(1);
  private pageSize$ = new BehaviorSubject(15);
  private refreshBehavior$ = this.service.getRefresh();
  public listJob$: Observable<Recruit[]> = new Observable<Recruit[]>();
  public comFrame: Company | undefined = new Company();
  public id = '';
  public des = '';
  public comFrameInfo$ = this.route.params.pipe(
    mergeMap((p) => {
      if (!this.service.isComFrameExist(p['comFrameId'])) {
        this.cancel();
      }
      this.id = p['comFrameId'];
      return this.service.getCompanyInfo(p['comFrameId']);
    }),
    tap(
      (it) => (this.comFrame = it)
      // ,
      // (this.listJobOfCompany$ = this.service
      //   .setJobByCompany(this.comFrame?.code)
      //   .pipe(map((data) => data.data))),
      // (this.listJob$ = combineLatest({
      //   listOfCompetences: this.listJobOfCompany$,
      //   pageIndex: this.pageIndex$,
      //   pageSize: this.pageSize$,
      //   searches: this.listOfSearches$,
      //   refresh: this.refreshBehavior$,
      // }).pipe(
      //   map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
      //     listOfCompetences.slice(
      //       (pageIndex - 1) * pageSize,
      //       pageIndex * pageSize
      //     )
      //   )
      // ))
    )
  );
  urlPath = 'https://server-api.newscv.tech';
  constructor(
    private message: NzMessageService,
    private route: ActivatedRoute,
    private service: CompanyService,
    private newsService: newsService,
    private router: Router,
    private competenceFrameCom: CompanyEntryComponent,
    private modal: NzModalService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {
    newsService
      .getLoggedInUser(localStorage.getItem('email') || '')
      .subscribe((user) => {
        if (user.errorCode === null) {
          this.user = user.data;
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('email');
          localStorage.removeItem('cv');
          localStorage.removeItem('searchKeyword');
          localStorage.removeItem('role');
        }
      });
    if (
      localStorage.getItem('role') === 'ADMIN' ||
      localStorage.getItem('role') === 'COMPANY'
    ) {
      this.showQt = true;
    } else {
      this.showQt = false;
    }
    if (
      localStorage.getItem('role') === 'ADMIN' ||
      localStorage.getItem('role') === 'USER'
    ) {
      this.showUs = true;
    } else {
      this.showUs = false;
    }
  }

  ngOnInit(): void {
    this.comFrame = this.service.Company;
    console.log('comFrame', this.comFrame);
    this.listJobOfCompany$ = this.service
      .setJobByCompany(this.comFrame?.code)
      .pipe(map((data) => data.data));
    this.listJob$ = combineLatest({
      listOfCompetences: this.listJobOfCompany$,
      pageIndex: this.pageIndex$,
      pageSize: this.pageSize$,
      searches: this.listOfSearches$,
      refresh: this.refreshBehavior$,
    }).pipe(
      map(({ listOfCompetences, pageIndex, pageSize, searches }) =>
        listOfCompetences.slice(
          (pageIndex - 1) * pageSize,
          pageIndex * pageSize
        )
      )
    );
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  showModal(): void {
    this.isVisible = true;
  }
  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  public updateQuillConfig(value: any): void {
    this.quillConfig = this.quillEditor.getFormat(value.range);
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
  public create() {
    this.service.conditionDup = false;
    this.router.navigate(['./companys/create']);
  }
  public update() {
    this.router.navigate(['./companys/' + this.id + '/edit']);
  }
  public cancel() {
    this.router.navigate(['./companys/']);
    this.competenceFrameCom.cancelDetailShow();
  }
  public delete() {
    this.modal.warning({
      nzTitle: `Bạn có muốn xóa năng lực ${this.comFrame?.name} không?`,
      nzOkDanger: true,
      nzClassName: 'customPopUp warning',
      nzOnOk: () => {
        return this.remove();
      },
      nzOkText: 'Xóa',
      nzCancelText: 'Hủy',
      nzOnCancel: () => {
        return;
      },
    });
  }
  remove() {
    if (this.comFrame) {
      this.message.success('Xoá thành công khung năng lực');
      // this.service.delete(this.comFrame);
      this.competenceFrameCom.getPageList();
      this.cancel();
    }
  }
  public duplicateClick() {
    this.message.success('Sao chép thành công khung năng lực');
    this.service.conditionDup = true;
    this.router.navigate(['./companys/create'], {
      state: {
        id: this.comFrame?.code,
      },
    });
  }
}

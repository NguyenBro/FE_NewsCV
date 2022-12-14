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
  Subscription,
  tap,
} from 'rxjs';
import { ComFrame } from '../../model/competence-frames.model';
import { Company, Recruit } from '../../model/news.model';
import { CompanysEntryComponent } from '../companys-entry/companys-entry.component';
import { CompanysService } from '../services/companys.service';

@Component({
  selector: 'app-company-view',
  templateUrl: './company-view.component.html',
  styleUrls: ['./company-view.component.less'],
})
export class CompanyViewComponent implements OnInit, AfterViewInit {
  public comFrame: Company | undefined = new Company();
  public id = '';
  public listJobOfCompany$: Observable<Recruit[]> = new Observable<Recruit[]>();
  showQt: boolean;
  subscriptions = new Subscription();
  private listOfSearches$ = new BehaviorSubject<string[]>([]);
  private pageIndex$ = new BehaviorSubject(1);
  private pageSize$ = new BehaviorSubject(15);
  private refreshBehavior$ = this.service.getRefresh();
  private rawListCom$ = this.service.setListOfJob();
  // .pipe(map((data) => data.data))
  public listJob$: Observable<Recruit[]> = new Observable<Recruit[]>();
  public comFrameInfo$ = this.route.params.pipe(
    mergeMap((p) => {
      if (!this.service.isComFrameExist(p['comFrameId'])) {
        this.cancel();
      }
      this.id = p['comFrameId'];
      return this.service.getCompanyInfo(p['comFrameId']);
    }),
    tap((it) => {
      this.comFrame = it;
      (this.listJobOfCompany$ = this.service
        .setJobByCompany(this.comFrame?.code)
        .pipe(map((data) => data.data))),
        (this.listJob$ = combineLatest({
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
        ));
    })
  );

  constructor(
    private message: NzMessageService,
    private route: ActivatedRoute,
    private service: CompanysService,
    private router: Router,
    private competenceFrameCom: CompanysEntryComponent,
    private modal: NzModalService,
    private cdr: ChangeDetectorRef
  ) {
    if (
      localStorage.getItem('role') === 'ADMIN' ||
      localStorage.getItem('role') === 'COMPANY'
    ) {
      this.showQt = true;
    } else {
      this.showQt = false;
    }
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
  ngOnInit(): void {}

  public create() {
    this.service.conditionDup = false;
    this.router.navigate(['./companys/create']);
  }
  public update() {
    this.router.navigate(['./companys/' + this.id + '/edit']);
  }
  public cancel() {
    this.router.navigate(['./companys']);
    this.competenceFrameCom.cancelDetailShow();
  }
  public delete() {
    this.modal.warning({
      nzTitle: `B???n c?? mu???n x??a c??ng ty ${this.comFrame?.name} kh??ng?`,
      nzOkDanger: true,
      nzClassName: 'customPopUp warning',
      nzOnOk: () => {
        return this.remove();
      },
      nzOkText: 'X??a',
      nzCancelText: 'H???y',
      nzOnCancel: () => {
        return;
      },
    });
  }
  remove() {
    if (this.comFrame) {
      this.service.deleteCompanyByCode(this.comFrame.code).subscribe((res) => {
        if (res.errorCode === null) {
          this.message.success('Xo?? c??ng ty th??nh c??ng');
          this.competenceFrameCom.getPageList();
          this.cancel();
        } else {
          this.message.error('Xo?? th???t b???i');
        }
      });
    }
  }
  // deleteById(code: string) {
  //   this.service.deleteCompanyByCode(code).subscribe((res) => {
  //     if (res.errorCode === null) {
  //       this.message.success('Xo?? c??ng ty th??nh c??ng');
  //       this.router.navigate(['./homepage/companys']);
  //       this.isDetailShown = false;
  //       this.getPageList(this.currentPage);
  //     } else {
  //       this.message.success('Xo?? th???t b???i');
  //     }
  //   });
  // }
  public duplicateClick() {
    this.message.success('Sao ch??p th??nh c??ng khung n??ng l???c');
    this.service.conditionDup = true;
    this.router.navigate(['./companys/create'], {
      state: {
        id: this.comFrame?.code,
      },
    });
  }
}

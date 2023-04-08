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
  showEdit=false;
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
      if(this.comFrame?.code!==undefined){
        if(localStorage.getItem('email')?.indexOf(this.comFrame?.code)===-1){
          this.showEdit=false;
        }else{
          this.showEdit=true;
        }
      }
      
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
      localStorage.getItem('role') === 'ADMIN' 
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
      nzTitle: `Bạn có muốn xóa công ty ${this.comFrame?.name} không?`,
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
      this.service.deleteCompanyByCode(this.comFrame.code).subscribe((res) => {
        if (res.errorCode === null) {
          this.message.success('Xoá công ty thành công');
          this.competenceFrameCom.getPageList();
          this.cancel();
        } else {
          this.message.error('Xoá thất bại');
        }
      });
    }
  }
  // deleteById(code: string) {
  //   this.service.deleteCompanyByCode(code).subscribe((res) => {
  //     if (res.errorCode === null) {
  //       this.message.success('Xoá công ty thành công');
  //       this.router.navigate(['./homepage/companys']);
  //       this.isDetailShown = false;
  //       this.getPageList(this.currentPage);
  //     } else {
  //       this.message.success('Xoá thất bại');
  //     }
  //   });
  // }
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

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
import { AutoJob } from '../../model/news.model';
import { AutoFindAppliService } from '../auto-find-appli.service';
import { AutoFindAppliEntryComponent } from '../auto-find-appli-entry/auto-find-appli-entry.component';
@Component({
  selector: 'app-auto-find-appli-view',
  templateUrl: './auto-find-appli-view.component.html',
  styleUrls: ['./auto-find-appli-view.component.less'],
})
export class AutoFindAppliViewComponent implements OnInit {
  public comFrame: AutoJob | undefined = new AutoJob();
  public id = '';
  showQt: boolean;
  showEdit = false;
  showCom = false;
  cv = '';
  subscriptions = new Subscription();
  public comFrameInfo$ = this.route.params.pipe(
    mergeMap((p) => {
      if (!this.service.isComFrameExist(p['comFrameId'])) {
        this.cancel();
      }
      this.id = p['comFrameId'];
      return this.service.getAutoJobInfo(p['comFrameId']);
    }),
    tap((it) => {
      this.comFrame = it;
      if (this.comFrame !== null && this.comFrame !== undefined) {
        this.cv = this.comFrame.cv.toString();
      }
      if (this.comFrame?.userId !== undefined) {
        if (
          localStorage
            .getItem('email')
            ?.indexOf(this.comFrame?.userId.toString()) === -1
        ) {
          this.showEdit = false;
        } else {
          this.showEdit = true;
        }
      }
      console.log('----------------', this.comFrame);
      console.log(
        '<<<<<<<<<<<<<<<<<<---------------->>>>>>>>>>>>>>>>>>',
        this.comFrame
      );
      if (this.comFrame?.userId !== undefined) {
        if (localStorage.getItem('role') === 'COMPANY') {
          this.showCom = true;
        } else {
          this.showCom = false;
        }
      }
    })
  );

  constructor(
    private message: NzMessageService,
    private route: ActivatedRoute,
    private service: AutoFindAppliService,
    private router: Router,
    private competenceFrameCom: AutoFindAppliEntryComponent,
    private modal: NzModalService,
    private cdr: ChangeDetectorRef
  ) {
    if (localStorage.getItem('role') === 'ADMIN') {
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
    this.router.navigate(['./AutoFindAppli/create']);
  }
  public update() {
    this.router.navigate(['./AutoFindAppli/' + this.id + '/edit']);
  }
  public cancel() {
    this.router.navigate(['./AutoFindAppli']);
    this.competenceFrameCom.cancelDetailShow();
  }
  // public delete() {
  //   this.modal.warning({
  //     nzTitle: `Bạn có muốn xóa công ty ${this.comFrame?.name} không?`,
  //     nzOkDanger: true,
  //     nzClassName: 'customPopUp warning',
  //     nzOnOk: () => {
  //       return this.remove();
  //     },
  //     nzOkText: 'Xóa',
  //     nzCancelText: 'Hủy',
  //     nzOnCancel: () => {
  //       return;
  //     },
  //   });
  // }
  // remove() {
  //   if (this.comFrame) {
  //     this.service.deleteCompanyByCode(this.comFrame.code).subscribe((res) => {
  //       if (res.errorCode === null) {
  //         this.message.success('Xoá công ty thành công');
  //         this.competenceFrameCom.getPageList();
  //         this.cancel();
  //       } else {
  //         this.message.error('Xoá thất bại');
  //       }
  //     });
  //   }
  // }
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
  // public duplicateClick() {
  //   this.message.success('Sao chép thành công khung năng lực');
  //   this.service.conditionDup = true;
  //   this.router.navigate(['./companys/create'], {
  //     state: {
  //       id: this.comFrame?.code,
  //     },
  //   });
  // }
}

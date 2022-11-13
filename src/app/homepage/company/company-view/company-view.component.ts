import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { mergeMap, tap } from 'rxjs';
import { ComFrame } from '../../model/competence-frames.model';
import { Company } from '../../model/news.model';
import { CompanysEntryComponent } from '../companys-entry/companys-entry.component';
import { CompanysService } from '../services/companys.service';

@Component({
  selector: 'app-company-view',
  templateUrl: './company-view.component.html',
  styleUrls: ['./company-view.component.less'],
})
export class CompanyViewComponent implements OnInit {
  public comFrame: Company | undefined = new Company();
  public id = '';
  public comFrameInfo$ = this.route.params.pipe(
    mergeMap((p) => {
      if (!this.service.isComFrameExist(p['comFrameId'])) {
        this.cancel();
      }
      this.id = p['comFrameId'];
      return this.service.getRecruitInfo(p['comFrameId']);
    }),
    tap((it) => (this.comFrame = it))
  );

  constructor(
    private message: NzMessageService,
    private route: ActivatedRoute,
    private service: CompanysService,
    private router: Router,
    private competenceFrameCom: CompanysEntryComponent,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.comFrame = this.service.company;
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
      this.service.delete(this.comFrame);
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

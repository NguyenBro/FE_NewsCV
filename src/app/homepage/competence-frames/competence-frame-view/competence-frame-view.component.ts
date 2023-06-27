import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { mergeMap, tap } from 'rxjs';
import {
  Application,
  Recruit,
  ResponseObject,
  user,
} from '../../model/news.model';
import { CompetenceFramesEntryComponent } from '../competence-frames-entry/competence-frames-entry.component';
import { CompetenceFramesService } from '../services/competence-frames.service';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { newsService } from '../../services/news.service';

@Component({
  selector: 'app-competence-frame-view',
  templateUrl: './competence-frame-view.component.html',
  styleUrls: ['./competence-frame-view.component.less'],
})
export class CompetenceFrameViewComponent implements OnInit {
  public user: user = new user();
  showQt: boolean;
  showUs: boolean;
  showCom = false;
  public apply: Application = new Application();
  public quillEditor: any;
  imageObj: File | undefined;
  isVisible = false;
  isConfirmLoading = false;
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

  public comFrame: Recruit | undefined = new Recruit();
  public id = '';
  public des = '';
  public comFrameInfo$ = this.route.params.pipe(
    mergeMap((p) => {
      if (!this.service.isComFrameExist(p['comFrameId'])) {
        this.cancel();
      }
      this.id = p['comFrameId'];
      return this.service.getRecruitInfo(p['comFrameId']);
    }),
    tap((it) => {
      this.comFrame = it;
      if (this.comFrame?.code !== undefined) {
        if (
          localStorage.getItem('email')?.indexOf(this.comFrame?.companyCode) ===
          -1
        ) {
          this.showCom = false;
        } else {
          this.showCom = true;
        }
      }
    })
  );
  urlPath = 'https://server-api.newscv.tech';
  constructor(
    private message: NzMessageService,
    private route: ActivatedRoute,
    private service: CompetenceFramesService,
    private newsService: newsService,
    private router: Router,
    private competenceFrameCom: CompetenceFramesEntryComponent,
    private modal: NzModalService,
    private http: HttpClient
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
    if (localStorage.getItem('role') === 'ADMIN') {
      this.showQt = true;
    } else {
      this.showQt = false;
    }
    if (localStorage.getItem('role') === 'USER') {
      this.showUs = true;
    } else {
      this.showUs = false;
    }
  }

  ngOnInit(): void {
    this.comFrame = this.service.recruit;
    console.log('comFrame', this.comFrame);
  }

  chooseCv(event: any) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData = new FormData();
      formData.append('file', file);
      const headers = new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      });

      this.http
        .post<ResponseObject>(
          `${this.urlPath + '/api/v1/imageFirebase'}`,
          formData,
          {
            headers: headers,
          }
        )
        .subscribe((res) => {
          console.log('fileasdasd', res.data);
          this.apply.cv = res.data;
        });
    }
  }
  showModal(): void {
    this.service
      .CheckAppli(this.user.id.toString(), this.comFrame?.id.toString())
      .subscribe((res) => {
        if (res.data != null) {
          this.apply = res.data;
          this.isVisible = true;
        } else {
          this.isVisible = true;
        }
      });
  }
  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }
  handleOk1(): void {
    this.isConfirmLoading = true;
    this.apply.idUser = this.user.id;
    this.apply.idJob = this.comFrame?.id || 0;
    this.service.applyCv(this.apply).subscribe((res) => {
      if (res.data !== null) {
        this.message.success('Ứng tuyển thành công');
      }
    });

    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  public updateQuillConfig(value: any): void {
    this.quillConfig = this.quillEditor.getFormat(value.range);
  }
  public fql(name: string, value?: string): void {
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
    this.router.navigate(['./competence-frames/create']);
  }
  public update() {
    this.router.navigate(['./competence-frames/' + this.id + '/edit']);
  }
  public cancel() {
    this.router.navigate(['./competence-frames/']);
    this.competenceFrameCom.cancelDetailShow();
  }
  public delete() {
    this.modal.warning({
      nzTitle: `Bạn có muốn xóa năng lực ${this.comFrame?.title} không?`,
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
      this.service
        .deleteCompetenceByCode(this.comFrame.code)
        .subscribe((res) => {
          if (res.errorCode === null) {
            this.message.success('Xoá tuyển dụng thành công');
            this.cancel();
            window.location.reload();
          } else {
            this.message.error('Xoá thất bại');
          }
        });
    }
  }
  public duplicateClick() {
    this.message.success('Sao chép thành công khung năng lực');
    this.service.conditionDup = true;
    this.router.navigate(['./competence-frames/create'], {
      state: {
        id: this.comFrame?.id,
      },
    });
  }
}

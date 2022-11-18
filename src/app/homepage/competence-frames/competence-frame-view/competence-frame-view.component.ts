import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { mergeMap, tap } from 'rxjs';
import { Recruit } from '../../model/news.model';
import { CompetenceFramesEntryComponent } from '../competence-frames-entry/competence-frames-entry.component';
import { CompetenceFramesService } from '../services/competence-frames.service';
import { htmlToText } from 'html-to-text';

@Component({
  selector: 'app-competence-frame-view',
  templateUrl: './competence-frame-view.component.html',
  styleUrls: ['./competence-frame-view.component.less'],
})
export class CompetenceFrameViewComponent implements OnInit {
  public quillEditor: any;
  leter = '';
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
    tap((it) => (this.comFrame = it))
  );

  constructor(
    private message: NzMessageService,
    private route: ActivatedRoute,
    private service: CompetenceFramesService,
    private router: Router,
    private competenceFrameCom: CompetenceFramesEntryComponent,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.comFrame = this.service.recruit;
    // const result = htmlToText(this.comFrame.description, {
    //   singleNewLineParagraphs: true,
    //   ignoreImage: true,
    //   formatters: {
    //     anchor: (el, walk, builder, opts) => {
    //       builder.openBlock();
    //       walk(el.children, builder);
    //       builder.closeBlock();
    //     },
    //   },
    // });
    // const appDiv: HTMLElement = document.getElementById('app') as HTMLElement;
    // appDiv.innerHTML = result;
    // this.comFrame.description = result;
    // console.log('this.comFrame.description',this.comFrame.description);

    // const { htmlToText } = require('html-to-text');

    // this.comFrame.description = htmlToText(this.comFrame.description, {
    //   wordwrap: 130,
    // });
    // this.comFrame.requirement = htmlToText(this.comFrame.requirement, {
    //   wordwrap: 130,
    // });
    // this.comFrame.treatment = htmlToText(this.comFrame.treatment, {
    //   wordwrap: 130,
    // });
  }
  // onImagePicked(event: Event): void {
  //   const FILE = (event.target as HTMLInputElement).files[0];
  //   this.imageObj = FILE;
  // }
  showModal(): void {
    this.isVisible = true;
  }
  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }
  handleOk1(): void {
    this.isConfirmLoading = true;
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
      this.message.success('Xoá thành công khung năng lực');
      this.service.delete(this.comFrame);
      this.competenceFrameCom.getPageList();
      this.cancel();
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

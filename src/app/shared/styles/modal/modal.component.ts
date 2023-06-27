import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzOverlayModule } from 'ng-zorro-antd/core/overlay';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { BadgesComponent } from '../badges/badges.component';
import { IconComponent } from '../icon/icon.component';
import { ModalComponentConfig } from './modal.models';

@Component({
  selector: 'ppx-modal',
  standalone: true,
  imports: [
    CommonModule,
    NzModalModule,
    NzButtonModule,
    IconComponent,
    BadgesComponent,
    NzOverlayModule,
  ],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent {
  @Input()
  typeModal: 'default' | 'card' = 'default';
  @Input()
  size: 'default' | 'small' = 'default';
  @Input()
  titleModal: ModalComponentConfig['titleModal'] = 'Đơn xin nghỉ';
  @Input()
  labelModal: ModalComponentConfig['labelModal'] = 'tannhp3';
  @Input()
  statusText: ModalComponentConfig['statusText'] = 'Chưa duyệt';
  @Input()
  iconModal: ModalComponentConfig['iconModal'] = 'day-off';
  @Input()
  state?: ModalComponentConfig['state'];
  @Input()
  postScriptModal: ModalComponentConfig['postScriptModal'] =
    'P/s: Nhớ giữ gìn sức khỏe bạn nhé?';
  @Output() closeEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  @Input()
  isVisible: ModalComponentConfig['isVisible'] = false;
  @Input()
  isFooter: ModalComponentConfig['isFooter'] = true;
  @Input() actionRight!: TemplateRef<unknown>;
  @Input() actionLeft!: TemplateRef<unknown>;
  @Output() isVisibleChange = new EventEmitter<
    ModalComponentConfig['isVisible']
  >();
  onClose() {
    this.isVisible = false;
    this.isVisibleChange.emit(false);
    this.closeEvent.emit(this.isVisible);
  }
  cancelClose() {
    this.cancelEvent.emit(this.isVisible);
  }
}

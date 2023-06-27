import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { NzTagModule } from 'ng-zorro-antd/tag';

import { IconComponent } from '../icon/icon.component';
import { BadgesComponentConfig } from './badges.models';
@Component({
  selector: 'ppx-badges',
  standalone: true,
  imports: [CommonModule, NzTagModule, IconComponent],
  templateUrl: './badge.component.html',
  styleUrls: ['./badges.component.less'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class BadgesComponent {
  @Input()
  state: BadgesComponentConfig['state'] = 'general';
  @Input()
  type: BadgesComponentConfig['type'] = 'primary';
  @Input()
  contain?: BadgesComponentConfig['contain'] = 'icon';
  @Input()
  iconName: BadgesComponentConfig['iconName'] = '';
  @Input()
  label: BadgesComponentConfig['label'] = '';
}

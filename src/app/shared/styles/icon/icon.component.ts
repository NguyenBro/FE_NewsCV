import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'ppx-icon',
  standalone: true,
  providers: [],
  imports: [NzIconModule, HttpClientModule],
  template: `
    <span
      nz-icon
      [nzType]="iconType"
      [style.color]="color"
      [style.font-size.px]="size"
    ></span>
  `,
  styles: [`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  `],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class IconComponent {
  @Input()
  iconName!: string | undefined;
  @Input()
  color?: string = 'inherit';
  @Input()
  size?: number;
  @Input()
  namespace = 'icons';

  get iconType() {
    return [this.namespace, this.iconName].join(':');
  }
}

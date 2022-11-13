import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-container-layout-w',
  templateUrl: './container-layout-w.component.html',
})
export class ContainerLayoutWComponent {
  @Input() id = '';
  @Input() rightHeader: TemplateRef<unknown> | null = null;
  @Input() leftHeader: TemplateRef<unknown> | null = null;
  @Input() rightBody: TemplateRef<unknown> | null = null;
  @Input() leftBody: TemplateRef<unknown> | null = null;
  @Input() topBody: TemplateRef<unknown> | null = null;
  @Input() showTopBody = false;
  @Input() showSideBar = false;
}

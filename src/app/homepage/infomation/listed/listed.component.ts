import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listed',
  templateUrl: './listed.component.html',
  styleUrls: ['./listed.component.less'],
})
export class ListedComponent implements OnInit {
  // public listInterview: interview[] = [];
  public selectedTab = 'news';
  public htmlContent =
    '<h3><strong>This is a title</strong></h3><br><p>This is a title Gastropub chillwave lumbersexual umami lyft. Poke austin direct trade, marfa raclette letterpress actually. Chartreuse sriracha pinterest twee lo-fi try-hard. Meditation banh mi kitsch, prism organic hot chicken literally heirloom occupy af semiotics food truck. Aesthetic asymmetrical gluten-free, health goth shaman meh lumbersexual bespoke kinfolk helvetica vaporware fashion axe freegan. Pour-over hammock succulents disrupt chartreuse raw denim. Brunch aesthetic fanny pack subway tile everyday carry green juice neutra beard cray small batch poke yuccie plaid pork belly. Blue bottle 8-bit flexitarian hashtag. Scenester marfa yuccie snackwave edison bulb. VHS blog pickled scenester venmo hashtag lo-fi.</p>';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public quillEditor: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  public isCenter = false;
  constructor(private router: Router) {}
  ngOnInit(): void {}

  public toggleTab(selectedTab: string): void {
    this.selectedTab = selectedTab;
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public updateQuillConfig(value: any): void {
    this.quillConfig = this.quillEditor.getFormat(value.range);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateText(event: any) {
    console.log('log event: ', event);
    if (event && event.event && event.event === 'text-change') {
      this.htmlContent = event.html ? event.html : this.htmlContent;
    }
  }
  createInterview() {
    this.router.navigate(['./recruit/create']);
  }
}

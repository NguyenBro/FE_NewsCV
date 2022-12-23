import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomepageComponent } from '../homepage.component';
// import { Editor } from 'ngx-editor';
// import { toHTML } from 'ngx-editor';
// import { toDoc } from 'ngx-editor';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';

const ANGULAR_EDITOR_LOGO_URL =
  'https://raw.githubusercontent.com/kolkov/angular-editor/master/docs/angular-editor-logo.png?raw=true';
@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.less'],
})
export class CreateNewsComponent implements OnInit {
  text = '';
  pdfSrc =
    'https://storage.googleapis.com/newscv-3595e.appspot.com/Cv-LeTranThaiNhan.pdf?fbclid=IwAR0hgPMYMzt1gai-t6miXpn-rgNAgW8MqHioUWx9J7DKFrWz8Yl3eaPgCK0';
  yourModelDate: Date = new Date();
  date: Date = new Date();
  isEnglish = false;
  html =
    '<h3>Mô tả công việc</h3><div><p>• Work closely with internal and external parties to rapidly iterate, experiment, and launch products.<br>• Create a unified component library for use across all products.<br>• Rapidly implement functional UI elements from design mocks, with an eye toward performance and accessibility.<br>• Know when to create abstractions vs. one-off features.<br>• Ensure that components are functional, elegant, performant, and mobile-friendly.<br>• Understand when and how to run UI tests.</p></div>';
  constructor(
    private router: Router,
    private homepage: HomepageComponent,
    private formBuilder: FormBuilder,
    private i18n: NzI18nService
  ) {}

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }
  ngOnInit() {
    this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
  }
}

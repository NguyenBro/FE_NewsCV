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
  text =
    '      tôi là ai trong em địt con mẹ em ANH ĐI CHƠI ĐÂY &%$#%^        ';
  test = '';
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
    this.test =
      this.removeVietnameseTones(this.text).split(' ').join('').toLowerCase() +
      '@newscv.tech';
    console.log(
      'văn bản',
      this.removeVietnameseTones(this.text).split(' ').join('').toLowerCase()
    );
  }
  removeVietnameseTones(str: string) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, ' ');
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(
      /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
      ' '
    );
    return str;
  }
}

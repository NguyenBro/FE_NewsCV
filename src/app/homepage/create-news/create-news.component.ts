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
    'https://00f74ba44b7053e1083c7cb16801383acb0034bdae-apidata.googleusercontent.com/download/storage/v1/b/newscv-3595e.appspot.com/o/1085618e-7f31-4090-a0b6-043c7fce3757pdf?jk=AFshE3XAMpLUe6ZJKAWvSV7xVCemBPBk_27d5Hf1DO_iZ0t-LhsIano8glJmuvlWWURvXOIXztCUC5lfrEcXjz0dnMq_RzKm_Rsp1NVkT_HXQHo71GJ-NuetuDoJzJFFcaHqXpgBGOqwVx9r_1pcBQ6NUlHCCMC9O0LScpCQcgX6S2IeuWa_QJsFjEBUcYDv-FFApJoh5I0dOWZsehtFQi2xJMmlHGVkGJdakoZ3vjO37XG3-QOEPHhVpL_ijDT3aztSh_5Jba-ahDbqY9hZnzcgfwXpln9bid8REG11roe7qDIHlI7FZESFL0kVbMKfpkcm9MS--r57cUpkNDBBB1jP9DE8plGGZukuWPmOryWRK2DwHBB2GYzsovi5r-hVlMOInSTuSUewfBIMl4GITOP7M-iitYi6INwb9HKJVsQW6hpkTIJ4DoBVeS4TJ6gd95rvGtVrUbO2TIevU31OE_T2XRs-A6rlUeTNa8M0_kDzZGLyR0N-wCkcces4jTQefWgIFHZpqDMg2pxJeigDGlBJ9DdoGO5zfeqg8XVhqltiikXhHijX7tT0v-kmdzgCFoATs6IBFMcdHt8x5W_U1Y3tuHdNFZjXXN0G6Qbay56JRwGTypBo89m8Kjqn7XUa3T-eq7Z7OyTzhJIDk05dcImbUdvJTXECzTT9gVAFfV6uIWdjajIQR4Qesd4iz1FW0pnslvRhyQtSb2sLxcCzEp1pYETMaLY1TuqKCxDF2ltV6aXtQKGz6h-KF7IysILift4jlmCdFRFHIyOiEByWWTcTeOxB1vhyXQxyDzg7z0bMdFokFXlya3pmYKje1k430Z_fpRQEIB4MqESSZtaAzxJJe5jzlZCob5hb6fkud2Yt062YucF4KFfFwFZXfATs_yqGAZIY5t9vPZUVIBsyNIWuR1dXKiE_EC7QYgqfVIqfxXvntmcn_Jx-TOFszg0rr0-Ma924F0r6XfogFLbhWgu6yQQ834z2Cat6VS23XauonrU7rEAqJ7crX3HhlGfJICUVQ58ZLo6sk1irXw5ImS70LY8Kdzjn1A_fbPqDt-uTSY4JY-sgeleEs1RSjdKbzp3YKOwE8jq6zQfJugytGaambSn9eruHoxRVEbdVsgSdLhZmmkXFN5IoBmNX3ZS3eRc-Smnlb2M1Tv0g7PhOX1p2GbzIos13ZKZ2GeSgeG486AsRra09ljuRYu5mRycgMaNc55mb-ZWDQE4vXN1CgUA1u7deig-f0rhvk6_4YYMScnRDMWNSwgpSbeTQnyb6_WYKkUFtAiqiRWM_vezOik4&isca=1';
  // pdfSrc =
  //   'https://firebasestorage.googleapis.com/v0/b/newscv-3595e.appspot.com/o/9e9c385b-9094-4fc6-aaf6-c544b7b2a2a2pdf?alt=media&fbclid=IwAR06l7HGzoi5vd6O26MWUJPfiKW5tVCdyavuY2WGlsQjj2e9TCMkYYMh2a0';
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

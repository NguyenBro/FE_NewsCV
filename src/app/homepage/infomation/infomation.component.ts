import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HomepageComponent } from '../homepage.component';
import { ResponseObject, user } from '../model/news.model';
import { newsService } from '../services/news.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-infomation',
  templateUrl: './infomation.component.html',
  styleUrls: ['./infomation.component.less'],
})
export class InfomationComponent implements OnInit {
  user: user = new user();
  switchValue = false;
  isVisible = false;
  isConfirmLoading = false;
  urlPath = 'https://server-api.newscv.tech';
  
  allChecked=false;
  DEV = false;
  Tester = false;
  Manager = false;
  QA = false;
  Expert = false;

  constructor(
    private service: newsService,
    private router: Router,
    private homepage: HomepageComponent,
    private http: HttpClient,
  ) {
    homepage.select = 'info';
    this.homepage.showLogo = true;
    service
      .getLoggedInUser(localStorage.getItem('email') || '')
      .subscribe((user) => {
        if (user.errorCode === null) {
          this.user = user.data;
          console.log('user1131', this.user);
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('email');
          localStorage.removeItem('cv');
          localStorage.removeItem('searchKeyword');
          localStorage.removeItem('role');
        }
      });
  }
  ngOnInit(): void {}
  ChangeSwitch(): void{
    if(this.switchValue===false){
      this.isVisible = true;
    }
  }
  changeAllChecked(){
    this.DEV = true;
    this.Tester = true;
    this.Manager = true;
    this.QA = true;
    this.Expert = true;
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
          // this.apply.cv = res.data;
        });
    }
  }
  handleCancel(): void {
    this.isVisible = false;
    this.switchValue=false;
  }
  handleOk1(): void {
    this.switchValue=true;
    this.isVisible = false;
  }
}

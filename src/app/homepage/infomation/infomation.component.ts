import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HomepageComponent } from '../homepage.component';
import { ResponseObject, user,AutoJob } from '../model/news.model';
import { newsService } from '../services/news.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InfomationService } from './infomation.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { log } from 'console';

@Component({
  selector: 'app-infomation',
  templateUrl: './infomation.component.html',
  styleUrls: ['./infomation.component.less'],
})
export class InfomationComponent implements OnInit {
  user: user = new user();
  AutoJob : AutoJob=new AutoJob();
  switchValue = false;
  isVisible = false;
  isVisible1=false;
  isConfirmLoading = false;
  urlPath = 'https://server-api.newscv.tech';
  autoAppli=false;

  allChecked=false;
  DEV = false;
  Tester = false;
  Manager = false;
  QA = false;
  Expert = false;
  //position
  Intern = false;
  Fresher = false;
  Junior = false;
  Midlevel = false;
  Leader = false;
  Senior = false;
  //ex
  NoEx = false;
  OneEx = false;
  TwoEx = false;
  FiveEx = false;
  OvFiveEx = false;

  constructor(
    private service: newsService,
    private Ifservice: InfomationService,
    private router: Router,
    private homepage: HomepageComponent,
    private http: HttpClient,
    private message: NzMessageService,
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
    this.Ifservice.getByIdAutoJob(localStorage.getItem('id')?.toString()).subscribe((res)=>{
      this.AutoJob=res.data;
      if(this.AutoJob.status==="On"){
        this.switchValue=true;
      }else{
        this.switchValue=false;
      }
    });
    if(localStorage.getItem("role")==="USER"){
      this.autoAppli=true;
    }
  }
  ngOnInit(): void {}
  ChangeSwitch(): void{
    console.log("this.switchValue::::::::",this.switchValue)
    if(this.switchValue===false){
      this.isVisible = true;
      this.Ifservice.getByIdAutoJob(localStorage.getItem('id')?.toString()).subscribe((res)=>{
        this.AutoJob=res.data;
        if(this.AutoJob.specialize.indexOf('Dev')!=-1){
          this.DEV = true;
        }else{
          this.DEV = false;
        };
        if(this.AutoJob.specialize.indexOf('Tester')!=-1){
          this.Tester = true;
        }else{
          this.Tester = false;
        };
        if(this.AutoJob.specialize.indexOf('Manager')!=-1){
          this.Manager = true;
        }else{
          this.Manager = false;
        };
        if(this.AutoJob.specialize.indexOf('QA')!=-1){
          this.QA = true;
        }else{
          this.QA = false;
        };
        if(this.AutoJob.specialize.indexOf('Expert')!=-1){
          this.Expert = true;
        }else{
          this.Expert = false;
        };
        if(this.AutoJob.specialize.indexOf('Expert')!=-1&&this.AutoJob.specialize.indexOf('Dev')!=-1&&this.AutoJob.specialize.indexOf('Tester')!=-1&&this.AutoJob.specialize.indexOf('Manager')!=-1&&this.AutoJob.specialize.indexOf('QA')!=-1){
          this.allChecked = true;
        }else{
          this.allChecked = false;
        };
        //position
        if(this.AutoJob.position.indexOf('Intern')!=-1){
          this.Intern = true;
        }else{
          this.Intern = false;
        };
        if(this.AutoJob.position.indexOf('Fresher')!=-1){
          this.Fresher = true;
        }else{
          this.Fresher = false;
        };
        if(this.AutoJob.position.indexOf('Junior')!=-1){
          this.Junior = true;
        }else{
          this.Junior = false;
        };
        if(this.AutoJob.position.indexOf('Mid-level')!=-1){
          this.Midlevel = true;
        }else{
          this.Midlevel = false;
        };
        if(this.AutoJob.position.indexOf('Leader')!=-1){
          this.Leader = true;
        }else{
          this.Leader = false;
        };
        //ex
        if(this.AutoJob.experience.indexOf('Không có')!=-1){
          this.NoEx = true;
        }else{
          this.NoEx = false;
        };
        if(this.AutoJob.experience.indexOf('Dưới 1 năm')!=-1){
          this.OneEx = true;
        }else{
          this.OneEx = false;
        };
        if(this.AutoJob.experience.indexOf('1-2 năm')!=-1){
          this.TwoEx = true;
        }else{
          this.TwoEx = false;
        };
        if(this.AutoJob.experience.indexOf('2-5 năm')!=-1){
          this.FiveEx = true;
        }else{
          this.FiveEx = false;
        };
        if(this.AutoJob.experience.indexOf('Trên 5 năm')!=-1){
          this.OvFiveEx = true;
        }else{
          this.OvFiveEx = false;
        };
      });
    }
    if(this.switchValue===true){
      this.Ifservice.offByIdAutoJob(localStorage.getItem('id')?.toString()).subscribe();
      console.log("đã thực thi")
    }
  }
  editCv(){
    this.isVisible1 = true;
    this.Ifservice.getByIdAutoJob(localStorage.getItem('id')?.toString()).subscribe((res)=>{
      this.AutoJob=res.data;
      if(this.AutoJob.specialize.indexOf('Dev')!=-1){
        this.DEV = true;
      }else{
        this.DEV = false;
      };
      if(this.AutoJob.specialize.indexOf('Tester')!=-1){
        this.Tester = true;
      }else{
        this.Tester = false;
      };
      if(this.AutoJob.specialize.indexOf('Manager')!=-1){
        this.Manager = true;
      }else{
        this.Manager = false;
      };
      if(this.AutoJob.specialize.indexOf('QA')!=-1){
        this.QA = true;
      }else{
        this.QA = false;
      };
      if(this.AutoJob.specialize.indexOf('Expert')!=-1){
        this.Expert = true;
      }else{
        this.Expert = false;
      };
      if(this.AutoJob.specialize.indexOf('Expert')!=-1&&this.AutoJob.specialize.indexOf('Dev')!=-1&&this.AutoJob.specialize.indexOf('Tester')!=-1&&this.AutoJob.specialize.indexOf('Manager')!=-1&&this.AutoJob.specialize.indexOf('QA')!=-1){
        this.allChecked = true;
      }else{
        this.allChecked = false;
      }
      //position
      if(this.AutoJob.position.indexOf('Intern')!=-1){
        this.Intern = true;
      }else{
        this.Intern = false;
      };
      if(this.AutoJob.position.indexOf('Fresher')!=-1){
        this.Fresher = true;
      }else{
        this.Fresher = false;
      };
      if(this.AutoJob.position.indexOf('Junior')!=-1){
        this.Junior = true;
      }else{
        this.Junior = false;
      };
      if(this.AutoJob.position.indexOf('Mid-level')!=-1){
        this.Midlevel = true;
      }else{
        this.Midlevel = false;
      };
      if(this.AutoJob.position.indexOf('Leader')!=-1){
        this.Leader = true;
      }else{
        this.Leader = false;
      };
      //ex
      if(this.AutoJob.experience.indexOf('Không có')!=-1){
        this.NoEx = true;
      }else{
        this.NoEx = false;
      };
      if(this.AutoJob.experience.indexOf('Dưới 1 năm')!=-1){
        this.OneEx = true;
      }else{
        this.OneEx = false;
      };
      if(this.AutoJob.experience.indexOf('1-2 năm')!=-1){
        this.TwoEx = true;
      }else{
        this.TwoEx = false;
      };
      if(this.AutoJob.experience.indexOf('2-5 năm')!=-1){
        this.FiveEx = true;
      }else{
        this.FiveEx = false;
      };
      if(this.AutoJob.experience.indexOf('Trên 5 năm')!=-1){
        this.OvFiveEx = true;
      }else{
        this.OvFiveEx = false;
      };
    });
  }
  changeAllChecked(){
    if(this.allChecked===true){
      this.DEV = true;
      this.Tester = true;
      this.Manager = true;
      this.QA = true;
      this.Expert = true;
      this.CheckSpecialize(['Dev','Tester','Manager','QA','Expert'])
    }else{
      this.DEV = false;
      this.Tester = false;
      this.Manager = false;
      this.QA = false;
      this.Expert = false;
      this.CheckSpecialize([])
    }
    
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
          if(res.data!=null){
            console.log('fileasdasd', res.data);
            this.AutoJob.cv = res.data;
            this.message.success( `Tải file thành công`);
          }else{
            this.message.error( `Không thể tải file`);
          }
          
        });
    }
  }
  handleCancel(): void {
    this.isVisible = false;
    this.switchValue=false;
  }
  handleCancel1(): void {
    this.isVisible1 = false;
  }
  handleOk(): void {
    this.switchValue=true;
    this.isVisible = false;
    this.isVisible1 = false;
    this.AutoJob.status="On"
    this.Ifservice.updateAutoJob(this.AutoJob,localStorage.getItem('id')?.toString()).subscribe()
  }
  CheckSpecialize(value: string[]): void {
    if(this.DEV === true&&this.Tester === true&&this.Manager === true&&this.QA === true&&this.Expert === true){
      this.allChecked=true;
    }else{
      this.allChecked=false;
    }
    console.log("specialize: ",value.join());
    this.AutoJob.specialize=value.join();
  }
  CheckPosition(value: string[]): void {
    console.log("position: ",value.join());
    this.AutoJob.position=value.join();
  }
  CheckExperience(value: string[]): void {
    console.log("experience: ",value.join());
    this.AutoJob.experience=value.join();
  }
}

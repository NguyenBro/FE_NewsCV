import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScheduleInterviewService } from '../schedule-interview.service';
import { ScheduleInterview } from 'src/app/homepage/model/news.model';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-list-date',
  templateUrl: './list-date.component.html',
  styleUrls: ['./list-date.component.less'],
})
export class ListDateComponent implements OnInit {
  radioValue = '';
  listDataMap: string[] = [];
  listDay: timeSchedule[] = [];
  date = '';
  intervSche: ScheduleInterview = new ScheduleInterview();
  constructor(
    private route: ActivatedRoute,
    private service: ScheduleInterviewService,
    private message: NzMessageService,
    private router: Router
  ) {
    this.service
      .getInterviewScheduleById(
        this.route.snapshot.paramMap.get('scheduleId')?.toString()
      )
      .subscribe((res) => {
        if (res.data.status === 'Yes' || res.data.status === 'No') {
          this.message.info('Lịch trình đã được chọn');
          this.router.navigate(['./Business/Page']);
        } else {
          this.intervSche = res.data;
          this.date = res.data.schedule;

          while (this.date.length > 0) {
            this.listDataMap.push(this.date.slice(0, this.date.indexOf(',')));
            this.date = this.date.replace(
              this.date.slice(0, this.date.indexOf(',') + 1),
              ''
            );
          }
          console.log('giá trị mảng', this.listDataMap);
          for (let i = 0; i < this.listDataMap.length; i++) {
            this.listDay.push({
              time: moment(this.listDataMap[i], 'hh:mm-DD/MM/YYYY').format(
                'hh:mm'
              ),
              day: moment(this.listDataMap[i], 'hh:mm-DD/MM/YYYY').format(
                'DD/MM/YYYY'
              ),
            });
          }
          this.radioValue = this.listDataMap[0];
          console.log('giá trị mảng listDay', this.listDay);
          console.log('data', this.radioValue);
        }
      });
  }

  ngOnInit(): void {}
  selectDate(time: string, date: string) {
    this.radioValue = time + '-' + date;
    console.log('ngày chọn', this.radioValue);
  }
  updateInterviewSchedule(status: string) {
    this.service
      .updateInterviewScheduleById(
        this.route.snapshot.paramMap.get('scheduleId')?.toString(),
        this.radioValue,
        status
      )
      .subscribe();
    if (status === 'Yes') {
      this.message.success('Chọn lịch phỏng vấn thành công');
      this.router.navigate(['./homepage/page']);
    } else {
      this.message.info('Lịch trình đã được huỷ');
      this.router.navigate(['./homepage/page']);
    }
  }
}
export class timeSchedule {
  time: string;
  day: string;

  constructor(clone?: timeSchedule) {
    if (clone) {
      this.time = clone.time;
      this.day = clone.day;
    } else {
      this.time = '';
      this.day = '';
    }
  }
}

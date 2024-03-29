import { Component, OnInit } from '@angular/core';
import { NzI18nService, en_US, vi_VN, zh_CN } from 'ng-zorro-antd/i18n';
import { ScheduleInterviewService } from '../schedule-interview.service';
import * as moment from 'moment';
import { ScheduleInterview } from 'src/app/homepage/model/news.model';

@Component({
  selector: 'app-list-schedule',
  templateUrl: './list-schedule.component.html',
  styleUrls: ['./list-schedule.component.less'],
})
export class ListScheduleComponent implements OnInit {
  //modal

  titleModal = 'Đơn xin nghỉ';
  labelModal = 'tannhp3';
  statusText = 'Chưa duyệt';
  iconModal = 'day-off';
  isVisible1 = true;
  //
  date = new Date();
  isVisible = false;
  isEnglish = false;
  listDataMap: string[] = [];
  listMonth: string[] = [];
  test = '';
  intervSche: ScheduleInterview[] = [];
  modalIntervSche: ScheduleInterview = new ScheduleInterview();
  constructor(
    private i18n: NzI18nService,
    private service: ScheduleInterviewService
  ) {
    this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
    this.service
      .getInterviewScheduleByComSta(
        localStorage
          .getItem('email')
          ?.slice(0, localStorage.getItem('email')?.indexOf('@')) || ' '
      )
      .subscribe((res) => {
        for (let i = 0; i < res.data.length; i++) {
          this.intervSche.push(res.data[i]);
          this.test = this.test + res.data[i].schedule + ',';
        }

        while (this.test.length > 0) {
          this.listDataMap.push(this.test.slice(0, this.test.indexOf(',')));
          this.test = this.test.replace(
            this.test.slice(0, this.test.indexOf(',') + 1),
            ''
          );
        }

        for (let i = 0; i < this.listDataMap.length; i++) {
          this.listMonth.push(
            moment(this.listDataMap[i], 'hh:mm-DD/MM/YYYY').format('M')
          );
          this.listDataMap[i] = moment(
            this.listDataMap[i],
            'hh:mm-DD/MM/YYYY'
          ).format('DMYYYY');
        }
        console.log('giá trị mảng', this.listDataMap);
        console.log('giá trị mảng tháng', this.listMonth);
        console.log('giá trị mảng intervSche', this.intervSche);
      });
  }

  ngOnInit(): void {}
  getMonthData(date: Date) {
    for (let i = 0; i < this.listMonth.length; i++) {
      if (date.getMonth() === Number(this.listMonth[i]) - 1) {
        return 1;
      }
    }
    return null;
  }
  closeEvent(isVisible1: boolean) {
    this.isVisible1 = false;
  }
  handleCancel(): void {
    this.isVisible = false;
  }
  selectChange(select: Date): void {
    for (let i = 0; i < this.intervSche.length; i++) {
      if (
        moment(this.intervSche[i].schedule, 'hh:mm-DD/MM/YYYY').format(
          'DMYYYY'
        ) === moment(select, 'dddd MMMM Do YYYY hh:mm:ss Z').format('DMYYYY')
      ) {
        this.modalIntervSche = this.intervSche[i];
      }
    }
    this.isVisible = true;
    this.date = select;
  }
}

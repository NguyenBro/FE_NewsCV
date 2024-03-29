import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzI18nService, en_US, zh_CN } from 'ng-zorro-antd/i18n';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ScheduleInterview } from 'src/app/homepage/model/news.model';
import { ScheduleInterviewService } from '../schedule-interview.service';
import * as moment from 'moment';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
})
export class CreateComponent implements OnInit {
  intervSche: ScheduleInterview = new ScheduleInterview();
  countDate = [1];
  dataModal: string[] = [];
  isEnglish = false;
  validateForm!: UntypedFormGroup;
  constructor(
    private fb: UntypedFormBuilder,
    private i18n: NzI18nService,
    private message: NzMessageService,
    private service: ScheduleInterviewService
  ) {
    this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
  }
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      name: [null, [Validators.required]],
      location: [null, [Validators.required]],
      contact: [null, [Validators.required]],
      schedules: new FormArray([new FormControl(null, Validators.required)]),
      note: [null],
    });

    console.log(
      'moment',
      moment('12-25-1995', 'MM-DD-YYYY').format('DD/MM/YYYY')
    );
    console.log(
      'moment',
      moment(
        'Sat Jun 24 2023 01:37:29 GMT+0700 (Indochina Time)',
        'dddd MMMM Do YYYY hh:mm:ss Z'
      ).format('DMYYYY')
    );
  }
  addDate() {
    this.schedules.push(new FormControl(null, Validators.required));
  }
  cancel(idx: number) {
    if (this.schedules.length > 1) {
      this.schedules.removeAt(idx);
    } else {
      console.log(this.schedules.errors);
      this.message.error('Phải có ít nhất 1 thời gian phỏng vấn');
    }
  }
  submitForm(): void {
    if (this.validateForm.valid) {
      this.intervSche.name = this.validateForm.value['name'];
      this.intervSche.company =
        localStorage
          .getItem('email')
          ?.slice(0, localStorage.getItem('email')?.indexOf('@')) || '';
      this.intervSche.email = this.validateForm.value['email'];
      for (let i = 0; i < this.validateForm.value['schedules'].length; i++) {
        this.intervSche.schedule =
          this.intervSche.schedule +
          moment(
            this.validateForm.value['schedules'][i],
            'dddd MMMM Do YYYY hh:mm:ss Z'
          ).format('hh:mm-DMYYYY') +
          ',';
      }
      this.intervSche.location = this.validateForm.value['location'];
      this.intervSche.contact = this.validateForm.value['contact'];
      this.intervSche.note = this.validateForm.value['note'];
      console.log('submit', this.intervSche);
      this.service.addInterviewSchedule(this.intervSche).subscribe();
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  onChange(result: Date, idx: number): void {
    // this.intervSche.schedule[idx] = result.toDateString();
    console.log('Selected Time: ', result, idx);
  }

  onOk(result: Date | Date[] | null): void {
    console.log('onOk', result);
  }

  get schedules() {
    return this.validateForm.get('schedules') as FormArray;
  }
}

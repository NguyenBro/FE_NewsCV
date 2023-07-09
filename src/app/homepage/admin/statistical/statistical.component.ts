import { Component, OnInit } from '@angular/core';
import { CompanysService } from '../../company/services/companys.service';
import { CompetenceFramesService } from '../../competence-frames/services/competence-frames.service';
import { NewsEventService } from '../../news-event/services/news-event.service';
import { NewsScholarshipService } from '../../news-scholarship/services/news-scholarship.service';
import { NewsCompetionService } from '../../news/services/news-competion.service';
import { AdminService } from '../services/admin.service';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-statistical',
  templateUrl: './statistical.component.html',
  styleUrls: ['./statistical.component.less'],
})
export class StatisticalComponent implements OnInit {
  optionPack: EChartsOption = {};
  dataPacks: any = [];
  load = true;
  //Company
  lengthCompany: Number = new Number();
  //news
  lengthNews = 0;
  lengthEvent = 0;
  lengthCompetion = 0;
  lengthScholarship = 0;
  //job
  lengthJob: Number = new Number();
  options: EChartsOption;
  constructor(
    private serviceCompany: CompanysService,
    private serviceEvent: NewsEventService,
    private serviceCompetion: NewsCompetionService,
    private serviceScholarship: NewsScholarshipService,
    private serviceCompetence: CompetenceFramesService,
    private serviceAdmin: AdminService
  ) {
    const xAxisData = [];
    const data1 = [];
    const data2 = [];

    for (let i = 0; i < 100; i++) {
      xAxisData.push('category' + i);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    this.options = {
      legend: {
        data: ['bar', 'bar2'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'bar',
          type: 'bar',
          data: data1,
          animationDelay: (idx) => idx * 10,
        },
        {
          name: 'bar2',
          type: 'bar',
          data: data2,
          animationDelay: (idx) => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };

    this.loadData();
  }
  async loadData() {
    //company
    this.serviceCompany.getListCompany().subscribe((listCom) => {
      this.lengthCompany = listCom.data.length;
    });
    //news
    this.serviceEvent.getListEvent().subscribe((lista) => {
      this.lengthEvent = lista.data.length;
      this.lengthNews = lista.data.length + this.lengthNews;
      this.dataPacks.push({
        value: lista.data.length,
        name: 'Sự kiện',
      });
    });
    this.serviceCompetion.getListCompetion().subscribe((listb) => {
      this.lengthCompetion = listb.data.length;
      this.lengthNews = listb.data.length + this.lengthNews;
      this.dataPacks.push({
        value: listb.data.length,
        name: 'Cuộc thi',
      });
    });
    this.serviceScholarship.getListScholarship().subscribe((listC) => {
      this.lengthScholarship = listC.data.length;
      this.lengthNews = listC.data.length + this.lengthNews;
      this.dataPacks.push({
        value: listC.data.length,
        name: 'Học bổng',
      });
      this.optionPack = {
        title: {
          text: 'Tổng số tin tức hiện tại : ' + this.lengthNews.toString(),
          subtext: '',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            name: 'Gói',
            type: 'pie',
            radius: '70%',
            data: this.dataPacks,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      };
    });
    this.optionPack = {
      title: {
        text: 'Tổng số tin tức hiện tại : ' + this.lengthNews.toString(),
        subtext: '',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: 'Gói',
          type: 'pie',
          radius: '70%',
          data: this.dataPacks,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
    // serviceAdmin.getInteractiveNews().subscribe((list) => {
    //   this.lengthNews = list.data.length;
    //   console.log('job', this.lengthJob);
    // });
    //job
    await this.serviceCompetence.getListRecruit().subscribe((list) => {
      this.lengthJob = list.data.length;
      this.load = false;
    });
  }
  ngOnInit(): void {}
}

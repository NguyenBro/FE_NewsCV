import { Component, OnInit, ViewChild } from '@angular/core';
import { Data } from '@angular/router';
import { vi_VN, NzI18nService, en_US } from 'ng-zorro-antd/i18n';
import { SubHis, TransHis } from 'src/app/homepage/model/news.model';
import { BusinessService } from '../business.service';
import { format, formatISO } from 'date-fns';
import { EChartsOption, number } from 'echarts';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.less'],
})
export class StatisticsComponent implements OnInit {
  checked = false;
  loading = false;
  indeterminate = false;
  listOfCurrentPageData: readonly Data[] = [];
  listOfSubHisPageData: readonly Data[] = [];
  setOfCheckedId = new Set<number>();
  searchValue = '';
  searchSub = '';
  visible = false;
  visibleSub = false;
  listOfData: TransHis[] = [];
  listOfSubHis: SubHis[] = [];
  listOfDisplayData = [...this.listOfData];
  listOfDisplaySubHis = [...this.listOfSubHis];
  code = '';
  totalRevenue = 0;
  monthRevenue = 0;
  beforeMonthRevenue = 0;
  afterMonthRevenue = 0;
  d = new Date();
  day = '';
  DateValue: Date = new Date();
  isEnglish = false;
  //chart
  isSource = [
    [
      'product',
      'Tháng ' + (Number(format(this.d, 'M')) - 1).toString(),
      'Tháng ' + format(this.d, 'M'),
      'Tháng ' + (Number(format(this.d, 'M')) + 1).toString(),
    ],
    ['Tổng doanh thu tháng'],
  ];

  options: EChartsOption = {};
  mergeOptions!: EChartsOption;
  //chart news
  option: EChartsOption = {};

  optionPack: EChartsOption = {};
  dataPacks: any = [];
  data: any = [];
  dataQCP: any = [];
  dataQCM: any = [];
  dataQTM: any = [];
  dataQTP: any = [];
  dataTDM: any = [];
  dataTDP: any = [];
  // end chart
  constructor(private i18n: NzI18nService, private service: BusinessService) {
    this.i18n.setLocale(this.isEnglish ? vi_VN : en_US); // đổi ngôn ngữ để cho datepiker nó hoạt động
    this.day =
      this.d.getFullYear().toString() +
      '-' +
      format(this.d, 'MM') +
      '-' +
      format(this.d, 'dd');
    this.service.getAllTrans().subscribe((data1) => {
      this.listOfData = data1.data;
      this.listOfDisplayData = [...this.listOfData];
      for (let i = 0; i < this.listOfData.length; i++) {
        this.totalRevenue =
          this.totalRevenue + Number(this.listOfData[i].money);
      }
    });
    // lấy data cho chart lịch sử
    this.service
      .getSubNumByTime(
        format(this.d, 'M'),
        this.d.getFullYear().toString(),
        'money'
      )
      .subscribe((res) => {
        for (let i = 0; i < res.data.length; i++) {
          this.data.unshift(res.data[i].month);
          this.dataQCP.unshift(res.data[i].listSubscription[0].total);
          this.dataQCM.unshift(res.data[i].listSubscription[1].total);
          this.dataQTM.unshift(res.data[i].listSubscription[2].total);
          this.dataQTP.unshift(res.data[i].listSubscription[3].total);
          this.dataTDM.unshift(res.data[i].listSubscription[4].total);
          this.dataTDP.unshift(res.data[i].listSubscription[5].total);
        }
        this.option = {
          title: {
            text: 'Doanh thu',
            subtext: 'Đơn vị $',
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: [
              'Quảng cáo premium',
              'Quảng cáo mini',
              'Quảng cáo và tuyển dụng mini',
              'Quảng cáo và tuyển dụng Premium',
              'Tuyển dụng mini',
              'Tuyển dụng premium',
            ],
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.data,
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              name: 'Quảng cáo premium',
              type: 'line',
              stack: 'Total',
              data: this.dataQCP,
            },
            {
              name: 'Quảng cáo mini',
              type: 'line',
              stack: 'Total',
              data: this.dataQCM,
            },
            {
              name: 'Quảng cáo và tuyển dụng mini',
              type: 'line',
              stack: 'Total',
              data: this.dataQTM,
            },
            {
              name: 'Quảng cáo và tuyển dụng Premium',
              type: 'line',
              stack: 'Total',
              data: this.dataQTP,
            },
            {
              name: 'Tuyển dụng mini',
              type: 'line',
              stack: 'Total',
              data: this.dataTDM,
            },
            {
              name: 'Tuyển dụng premium',
              type: 'line',
              stack: 'Total',
              data: this.dataTDP,
            },
          ],
        };
      });
    // lấy data cho chart các gói đã bán
    this.service.getSubNum().subscribe((res) => {
      let totalPacks = 0;
      for (let i = 0; i < res.data.length; i++) {
        this.dataPacks.push({
          value: res.data[i].total,
          name: res.data[i].name,
        });
        totalPacks = res.data[i].total + totalPacks;
      }
      // this.optionPack = {
      //   tooltip: {
      //     trigger: 'item',
      //   },
      //   legend: {
      //     top: '5%',
      //     left: 'center',
      //   },
      //   series: [
      //     {
      //       name: 'Gói',
      //       type: 'pie',
      //       radius: ['40%', '70%'],
      //       avoidLabelOverlap: false,
      //       itemStyle: {
      //         borderRadius: 10,
      //         borderColor: '#fff',
      //         borderWidth: 2,
      //       },
      //       label: {
      //         show: false,
      //         position: 'center',
      //       },
      //       emphasis: {
      //         label: {
      //           show: true,
      //           fontSize: 40,
      //           fontWeight: 'bold',
      //         },
      //       },
      //       labelLine: {
      //         show: false,
      //       },
      //       data: this.dataPacks,
      //     },
      //   ],
      // };
      this.optionPack = {
        title: {
          text: 'Tổng số gói đã bán được : ' + totalPacks.toString(),
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
    //doanh thu tháng hiện tại
    this.service
      .getAllTransByTime(
        (this.d.getMonth() + 1).toString(),
        this.d.getFullYear().toString()
      )
      .subscribe((data) => {
        for (let i = 0; i < data.data.length; i++) {
          this.monthRevenue = this.monthRevenue + Number(data.data[i].money);
        }
      });
  }

  ngOnInit(): void {
    this.service.getAllSubHis().subscribe((data) => {
      this.listOfSubHis = data.data;
      this.listOfDisplaySubHis = [...this.listOfSubHis];
    });
  }
  switchLanguage() {
    this.i18n.setLocale(vi_VN);
  }
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter(
      (item: TransHis) => item.company.indexOf(this.searchValue) !== -1
    );
  }

  onCurrentPageDataChange(listOfCurrentPageData: readonly Data[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }
  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData.filter(
      ({ disabled }) => !disabled
    );
    this.checked = listOfEnabledData.every(({ id }) =>
      this.setOfCheckedId.has(id)
    );
    this.indeterminate =
      listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) &&
      !this.checked;
  }
  resetSub(): void {
    this.searchSub = '';
    this.searchSubHis();
  }

  searchSubHis(): void {
    this.visibleSub = false;
    this.listOfDisplaySubHis = this.listOfSubHis.filter(
      (item: SubHis) => item.company.indexOf(this.searchSub) !== -1
    );
  }
  allTrans() {
    this.service.getAllTrans().subscribe((data1) => {
      this.listOfData = data1.data;
      this.listOfDisplayData = [...this.listOfData];
    });
  }
  //list sub his
  onCurrentPageSubChange(listOfSubHisPageData: readonly Data[]): void {
    this.listOfSubHisPageData = listOfSubHisPageData;
  }
  onChange(result: Date): void {
    var a = format(result, 'yyyy/MM');
    this.d.setMonth(Number(format(result, 'M')) - 1);
    this.d.setFullYear(Number(format(result, 'yyyy')));
    this.isSource[0].splice(
      1,
      3,
      'Tháng ' + this.d.getMonth().toString(),
      'Tháng ' + (this.d.getMonth() + 1).toString(),
      'Tháng ' + (this.d.getMonth() + 2).toString()
    );

    this.setData(this.d);
    this.options = {
      legend: {},
      title: {
        left: '20%',
        text: 'Tổng doanh thu theo tháng',
        subtext: 'Tính theo đơn vị $',
        textAlign: 'center',
      },
      tooltip: {},
      dataset: {
        // Provide a set of data.
        source: this.isSource,
      },
      xAxis: { type: 'category' },
      yAxis: {},
      series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }],
    };

    // this.mergeOptions = {
    //   dataset: {
    //     source: [
    //       [
    //         'product',
    //         'Tháng ' + this.d.getMonth().toString(),
    //         'Tháng ' + (this.d.getMonth() + 1).toString(),
    //         'Tháng ' + (this.d.getMonth() + 2).toString(),
    //       ],
    //       [
    //         'Tổng doanh thu tháng',
    //         this.beforeMonthRevenue,
    //         this.monthRevenue,
    //         this.afterMonthRevenue,
    //       ],
    //     ],
    //   },
    // };
  }
  //chart
  setData(day: Date) {
    this.monthRevenue = 0;
    this.beforeMonthRevenue = 0;
    this.afterMonthRevenue = 0;
    //doanh thu tháng trước
    this.service
      .getAllTransByTime(
        day.getMonth().toString(),
        day.getFullYear().toString()
      )
      .subscribe((data) => {
        for (let i = 0; i < data.data.length; i++) {
          this.beforeMonthRevenue =
            this.beforeMonthRevenue + Number(data.data[i].money);
        }
        this.isSource[1][1] = this.beforeMonthRevenue.toString();
      });
    //doanh thu tháng hiện tại
    this.service
      .getAllTransByTime(
        (day.getMonth() + 1).toString(),
        day.getFullYear().toString()
      )
      .subscribe((data) => {
        for (let i = 0; i < data.data.length; i++) {
          this.monthRevenue = this.monthRevenue + Number(data.data[i].money);
        }
        this.isSource[1][2] = this.monthRevenue.toString();
      });
    //doanh thu tháng sau
    this.service
      .getAllTransByTime(
        (day.getMonth() + 2).toString(),
        day.getFullYear().toString()
      )
      .subscribe((data) => {
        for (let i = 0; i < data.data.length; i++) {
          this.afterMonthRevenue =
            this.afterMonthRevenue + Number(data.data[i].money);
        }
        this.isSource[1][3] = this.afterMonthRevenue.toString();
      });
  }
  RandomDataset() {
    this.mergeOptions = {
      dataset: {
        source: [
          ['product', '2015', '2016', '2017'],
          ['Matcha Latte', ...this.getRandomValues()],
          ['Milk Tea', ...this.getRandomValues()],
          ['Cheese Cocoa', ...this.getRandomValues()],
          ['Walnut Brownie', ...this.getRandomValues()],
        ],
      },
    };
  }
  private getRandomValues() {
    const res: number[] = [];
    for (let i = 0; i < 3; i++) {
      res.push(Math.random() * 100);
    }
    return res;
  }
  //end chart
}
export class dataOption {
  value: Number = new Number();
  name = '';
}

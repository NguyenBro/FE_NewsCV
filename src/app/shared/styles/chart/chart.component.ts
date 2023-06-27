import {
  Component,
  Input,
  OnInit,
  OnChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { EChartsOption } from 'echarts';
import { NgxEchartsModule, NGX_ECHARTS_CONFIG } from 'ngx-echarts';
interface OptionInput {
  chartFontFamily?: string;
  tooltipFormatter?: string;
  tooltipTitle?: string;
  legendOrient?: string;
  legendBottom?: number;
  legendFontSize?: number;
  legendFormart(name: string): string;
  seriesMax?: number;
  seriesBottom?: number;
  seriesLabelFontSize?: number;
  seriesLabelFontSizeA?: number;
  // seriesLabelColor: string;
  seriesLabelLineHeight?: number;
  seriesSizeCircle?: number | string;
  seriesColorCircle?: string;
  seriesTitleCircle?: string;
  seriesCircleBorder?: (string | number)[];
  seriesItemStyleBorderRadius?: number;
  seriesItemStyleBorderColor?: string;
  seriesItemStyleBorderWidth?: number;
  // seriesDataValue: number;
  dataOption: Array<Data>;
}
interface OptionInputGauges {
  chartFontFamily?: string;
  seriesMax?: number;
  seriesLabelFontSize?: number;
  seriesLabelColor?: string;
  seriesLabelLineHeight?: number;
  seriesTitleCircle?: string;
  seriesDataValue?: number;
}
interface Data {
  value: number;
  name: string;
  itemStyle: object;
}
interface OptionGauge {
  series: [
    {
      // name: 'Thống kê phép',
      type: 'gauge';
      max?: number;
      startAngle: 90;
      endAngle: -270;
      radius: '60%';
      pointer: {
        show: false;
      };
      progress: {
        show: true;
        overlap: false;
        roundCap: true;
        clip: false;
        itemStyle: {
          shadowBlur: 10;
          shadowColor: '#C6C7F8';
          color: {
            type: 'radial';
            x: 0.4;
            y: 0.3;
            r: 1;
            colorStops: [
              {
                offset: 0;
                color: '#8B7CF6';
              },
              {
                offset: 1;
                color: '#432EE1';
              }
            ];
          };
        };
      };
      axisLine: {
        lineStyle: {
          width: 20;
        };
      };
      splitLine: {
        show: false;
      };
      axisTick: {
        show: false;
      };
      axisLabel: {
        show: false;
        distance: 50;
      };
      // label: {
      //   show: false,
      //   position: 'center'
      // },
      data: [
        {
          value?: number;
          detail: {
            valueAnimation: true;
            offsetCenter: ['0%', '5%'];
          };
        }
      ];
      detail: {
        fontSize?: number;
        color?: string;
        // borderRadius: 0,
        formatter?: string;
        fontFamily?: string;
        lineHeight?: number;
      };
    }
  ];
}
interface OptionPie {
  tooltip: {
    trigger: 'item';
    formatter?: string;
    textStyle: {
      fontFamily?: string;
    };
  };
  legend: {
    // show: true ,
    orient?: string;
    bottom?: number;
    // align:'auto',
    itemGap: 10;
    textStyle: {
      fontFamily?: string;
      fontSize?: number;
      rich: {
        a: {
          color: '#555555';
          fontWeight: '700';
          fontSize?: number;
          fontFamily?: string;
        };
      };
    };
    data: any;
    formatter: any;
  };
  series: [
    {
      tooltip: {
        show: false;
      };
      max?: number;
      type: 'pie';
      bottom?: number;
      radius: (number | string | undefined)[];
      label: {
        color: '#6A5AE0';
        position: 'center';
        fontSize?: number;
        fontFamily?: string;
        lineHeight?: number;
        fontWeight: 700;
        formatter?: string;
        rich: {
          a: {
            color: '#979CA8';
            fontSize?: number;
            fontFamily?: string;
            align: 'center';
            fontWeight: 400;
          };
        };
      };
      labelLine: {
        show: true;
      };
      data: [{ value: 0; name: 'Tổng phép'; itemStyle: { color?: string } }];
    },
    {
      name?: string;
      bottom?: number;
      type: 'pie';
      radius: (string | number)[];
      itemStyle: {
        borderRadius?: number;
        borderColor?: string;
        borderWidth?: number;
      };
      label: {
        show: false;
        position: 'center';
      };
      data: any;
    }
  ];
}

@Component({
  selector: 'ppx-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.less'],
  imports: [NgxEchartsModule],
  standalone: true,
  providers: [
    {
      provide: NGX_ECHARTS_CONFIG,
      useFactory: () => ({ echarts: () => import('echarts') }),
    },
  ],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() chartType: 'pie' | 'gauge' = 'pie';
  @Input()
  optionInputPie: OptionInput = {
    chartFontFamily: 'Nunito',
    legendOrient: 'vertical',
    legendBottom: 0,
    legendFontSize: 16,
    seriesMax: 20,
    seriesBottom: 100,
    tooltipTitle: 'Thống kê phép',
    tooltipFormatter: '{a} <br/>{b}: {c} ngày',
    seriesSizeCircle: '55%',
    seriesLabelFontSize: 16,
    seriesLabelFontSizeA: 20,
    // seriesLabelColor: '#6A5AE0',
    seriesLabelLineHeight: 25,
    seriesColorCircle: '#EBF2FB',
    seriesTitleCircle: `{a|Tổng phép}\n20 ngày`,
    seriesCircleBorder: ['60%', '80%'],
    seriesItemStyleBorderRadius: 50,
    seriesItemStyleBorderColor: '#fff',
    seriesItemStyleBorderWidth: 10,
    // seriesDataValue: 10,
    dataOption: [
      { value: 12, name: 'Theo LLĐ', itemStyle: { color: '#007AFF' } },
      { value: 2, name: 'Nhân viên lâu năm', itemStyle: { color: '#36CFC9' } },
      {
        value: 2,
        name: 'Năm trước chuyển sang',
        itemStyle: { color: '#FF3658' },
      },
      { value: 4, name: 'Quy đổi tăng ca', itemStyle: { color: '#FF9900' } },
    ],
    legendFormart: (name: string) => {
      const value = [
        { value: 12, name: 'Theo LLĐ', itemStyle: { color: '#007AFF' } },
        {
          value: 2,
          name: 'Nhân viên lâu năm',
          itemStyle: { color: '#36CFC9' },
        },
        {
          value: 2,
          name: 'Năm trước chuyển sang',
          itemStyle: { color: '#FF3658' },
        },
        { value: 4, name: 'Quy đổi tăng ca', itemStyle: { color: '#FF9900' } },
      ].filter((row) => row.name === name)[0].value;
      return name + ':' + ' ' + `{a|${value} ngày}`;
    },
  };
  @Input()
  optionInputGauge: OptionInputGauges = {
    chartFontFamily: 'Nunito',
    seriesTitleCircle: '{value} ngày đã dùng \n / 20 ngày',
    seriesLabelLineHeight: 30,
    seriesLabelFontSize: 20,
    seriesLabelColor: '#6A5AE0',
    seriesDataValue: 10,
    seriesMax: 20,
  };
  option: EChartsOption = {};
  optionPie: OptionPie = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ngày',
      textStyle: {
        fontFamily: 'Nunito',
      },
    },
    legend: {
      // show: true ,
      orient: 'vertical',
      bottom: 0,
      // align:'auto',
      itemGap: 10,
      textStyle: {
        fontFamily: 'Nunito',
        fontSize: 14,
        rich: {
          a: {
            color: '#555555',
            fontWeight: '700',
            fontSize: 14,
            fontFamily: 'Nunito',
          },
        },
      },
      data: this.optionInputPie.dataOption,
      formatter: (name: string) => {
        const value = this.optionInputPie.dataOption.filter(
          (row) => row.name === name
        )[0].value;
        return name + ':' + ' ' + `{a|${value} ngày}`;
      },
    },
    series: [
      {
        tooltip: {
          show: false,
        },
        max: 20,
        type: 'pie',
        bottom: 100,
        radius: [0, '55%'],
        label: {
          color: '#6A5AE0',
          position: 'center',
          fontSize: 16,
          fontFamily: 'Nunito',
          lineHeight: 30,
          fontWeight: 700,
          formatter: `{a|Tổng phép}\n20 ngày`,
          rich: {
            a: {
              color: '#979CA8',
              fontSize: 20,
              fontFamily: 'Nunito',
              align: 'center',
              fontWeight: 400,
            },
          },
        },
        labelLine: {
          show: true,
        },
        data: [
          { value: 0, name: 'Tổng phép', itemStyle: { color: '#EBF2FB' } },
        ],
      },
      {
        name: 'Thống kê phép',
        bottom: 100,
        type: 'pie',
        radius: ['60%', '80%'],
        itemStyle: {
          borderRadius: 50,
          borderColor: '#fff',
          borderWidth: 10,
        },
        label: {
          show: false,
          position: 'center',
        },
        data: this.optionInputPie.dataOption,
      },
    ],
  };
  optionGauge: OptionGauge = {
    // tooltip: {
    //   trigger: 'item',
    //   formatter: '{a} <br/>{b}: {c} ngày'
    // },
    series: [
      {
        // name: 'Thống kê phép',
        type: 'gauge',
        max: 20,
        startAngle: 90,
        endAngle: -270,
        radius: '60%',
        pointer: {
          show: false,
        },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: {
            shadowBlur: 10,
            shadowColor: '#C6C7F8',
            color: {
              type: 'radial',
              x: 0.4,
              y: 0.3,
              r: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#8B7CF6',
                },
                {
                  offset: 1,
                  color: '#432EE1',
                },
              ],
            },
          },
        },
        axisLine: {
          lineStyle: {
            width: 20,
          },
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
          distance: 50,
        },
        // label: {
        //   show: false,
        //   position: 'center'
        // },
        data: [
          {
            value: 10,
            detail: {
              valueAnimation: true,
              offsetCenter: ['0%', '5%'],
            },
          },
        ],
        detail: {
          fontSize: 24,
          color: '#432EE1',
          // borderRadius: 0,
          formatter: '{value} ngày đã dùng \n / 20 ngày',
          fontFamily: 'Nunito',
          lineHeight: 25,
        },
      },
    ],
  };
  setType() {
    switch (this.chartType) {
      case 'pie':
        this.option = this.optionPie as unknown as EChartsOption;
        //tooltip
        this.optionPie.series[1].data = this.optionInputPie.dataOption;

        this.optionPie.series[1].data = this.optionInputPie.dataOption;
        this.optionPie.legend.data = this.optionInputPie.dataOption;
        if (this.optionInputPie.tooltipFormatter) {
          this.optionPie.tooltip.formatter =
            this.optionInputPie.tooltipFormatter;
        }
        if (this.optionInputPie.chartFontFamily) {
          this.optionPie.tooltip.textStyle.fontFamily =
            this.optionInputPie.chartFontFamily;
          this.optionPie.legend.textStyle.fontFamily =
            this.optionInputPie.chartFontFamily;
          this.optionPie.legend.textStyle.rich = {
            a: {
              color: '#555555',
              fontWeight: '700',
              fontSize: this.optionInputPie.legendFontSize,
              fontFamily: this.optionInputPie.chartFontFamily,
            },
          };
          this.optionPie.series[0].label.fontFamily =
            this.optionInputPie.chartFontFamily;
        }
        //legend

        if (this.optionInputPie.legendOrient) {
          this.optionPie.legend.orient = this.optionInputPie.legendOrient;
        }
        if (this.optionInputPie.legendBottom) {
          this.optionPie.legend.bottom = this.optionInputPie.legendBottom;
        }
        if (this.optionInputPie.legendFontSize) {
          this.optionPie.legend.textStyle.fontSize =
            this.optionInputPie.legendFontSize;
        }
        this.optionPie.legend.formatter = this.optionInputPie.legendFormart;
        //series[0]
        if (this.optionInputPie.seriesMax) {
          this.optionPie.series[0].max = this.optionInputPie.seriesMax;
        }
        if (this.optionInputPie.seriesBottom) {
          this.optionPie.series[0].bottom = this.optionInputPie.seriesBottom;
        }
        if (this.optionInputPie.seriesSizeCircle) {
          this.optionPie.series[0].radius = [
            0,
            this.optionInputPie.seriesSizeCircle,
          ];
        }
        if (this.optionInputPie.seriesLabelFontSize) {
          this.optionPie.series[0].label.fontSize =
            this.optionInputPie.seriesLabelFontSize;
        }
        if (this.optionInputPie.seriesLabelLineHeight) {
          this.optionPie.series[0].label.lineHeight =
            this.optionInputPie.seriesLabelLineHeight;
        }
        if (this.optionInputPie.seriesColorCircle) {
          this.optionPie.series[0].data = [
            {
              value: 0,
              name: 'Tổng phép',
              itemStyle: { color: this.optionInputPie.seriesColorCircle },
            },
          ];
        }
        if (this.optionInputPie.seriesTitleCircle) {
          this.optionPie.series[0].label.formatter =
            this.optionInputPie.seriesTitleCircle;
        }
        this.optionPie.series[0].label.rich = {
          a: {
            color: '#979CA8',
            fontSize: this.optionInputPie.seriesLabelFontSizeA
              ? this.optionInputPie.seriesLabelFontSizeA
              : 20,
            fontFamily: this.optionInputPie.chartFontFamily
              ? this.optionInputPie.chartFontFamily
              : 'Nunito',
            align: 'center',
            fontWeight: 400,
          },
        };
        //series[1]
        if (this.optionInputPie.seriesBottom) {
          this.optionPie.series[1].bottom = this.optionInputPie.seriesBottom;
        }
        if (this.optionInputPie.tooltipTitle) {
          this.optionPie.series[1].name = this.optionInputPie.tooltipTitle;
        }
        if (this.optionInputPie.seriesCircleBorder) {
          this.optionPie.series[1].radius =
            this.optionInputPie.seriesCircleBorder;
        }

        this.optionPie.series[1].itemStyle = {
          borderRadius: this.optionInputPie.seriesItemStyleBorderRadius
            ? this.optionInputPie.seriesItemStyleBorderRadius
            : 50,
          borderColor: this.optionInputPie.seriesItemStyleBorderColor
            ? this.optionInputPie.seriesItemStyleBorderColor
            : '#fff',
          borderWidth: this.optionInputPie.seriesItemStyleBorderWidth
            ? this.optionInputPie.seriesItemStyleBorderWidth
            : 10,
        };
        return;
      default:
        this.option = this.optionGauge as unknown as EChartsOption;
        if (this.optionInputGauge.seriesLabelColor) {
          this.optionGauge.series[0].detail.color =
            this.optionInputGauge.seriesLabelColor;
        }
        if (this.optionInputGauge.chartFontFamily) {
          this.optionGauge.series[0].detail.fontFamily =
            this.optionInputGauge.chartFontFamily;
        }
        if (this.optionInputGauge.seriesLabelLineHeight) {
          this.optionGauge.series[0].detail.lineHeight =
            this.optionInputGauge.seriesLabelLineHeight;
        }
        if (this.optionInputGauge.seriesTitleCircle) {
          this.optionGauge.series[0].detail.formatter =
            this.optionInputGauge.seriesTitleCircle;
        }
        if (this.optionInputGauge.seriesLabelFontSize) {
          this.optionGauge.series[0].detail.fontSize =
            this.optionInputGauge.seriesLabelFontSize;
        }
        if (this.optionInputGauge.seriesMax) {
          this.optionGauge.series[0].max = this.optionInputGauge.seriesMax;
        }
        // seriesMax: 20,
        if (this.optionInputGauge.seriesDataValue) {
          this.optionGauge.series[0].data[0].value =
            this.optionInputGauge.seriesDataValue;
        }
        return;
    }
  }

  ngOnInit(): void {
    this.setType();
  }
  ngOnChanges() {
    /**********THIS FUNCTION WILL TRIGGER WHEN PARENT COMPONENT UPDATES 'someInput'**************/
    //Write your code here
    this.setType();
  }
}

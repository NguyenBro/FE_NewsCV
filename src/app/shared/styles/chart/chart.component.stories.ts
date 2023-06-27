import { Meta, Story } from '@storybook/angular';
import { ChartComponent } from './chart.component';
import { Component } from '@angular/core';

export default {
  title: 'Components/ChartComponent',
  component: ChartComponent,
  parameters: {
    docs: {
      description: {
        component: 'Một bảng hiển thị các hàng dữ liệu.',
      },
    },
  },
  argTypes: {
    chartType: {
      name: 'chartType',
      defaultValue: 'gauge',
      description: 'Mảng bản ghi dữ liệu sẽ được kết xuất.',
      table: {
        type: { summary: "'pie' | 'gauge'" },
        defaultValue: { summary: 'gauge' },
        category: 'ppx-chart',
      },
      control: {
        type: 'select',
        options: ['pie', 'gauge'],
      },
    },
    chartFontFamily: {
      name: 'chartFontFamily',
      description: 'Kiểu phông chữ tiêu đề.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Nunito' },
        category: 'ppx-chart',
        subcategory: 'optionInputGauge & optionInputPie',
      },
      control: {
        type: 'text',
      },
    },
    seriesMax: {
      name: 'seriesMax',
      description: 'Giá trị lớn nhất của chart.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 20 },
        category: 'ppx-chart',
        subcategory: 'optionInputGauge & optionInputPie',
      },
      control: {
        type: 'number',
      },
    },
    seriesLabelFontSize: {
      name: 'seriesLabelFontSize',
      description: 'Kich thước tiêu đề.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 20 },
        category: 'ppx-chart',
        subcategory: 'optionInputGauge & optionInputPie',
      },
      control: {
        type: 'number',
      },
    },
    seriesLabelColor: {
      name: 'seriesLabelFontSize',
      description: 'Kich thước tiêu đề.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#6A5AE0' },
        category: 'ppx-chart',
        subcategory: 'optionInputGauge & optionInputPie',
      },
      control: {
        type: 'text',
      },
    },
    seriesLabelLineHeight: {
      name: 'seriesLabelFontSize',
      description: 'Line height của tiêu đề.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 30 },
        category: 'ppx-chart',
        subcategory: 'optionInputGauge & optionInputPie',
      },
      control: {
        type: 'number',
      },
    },
    seriesTitleCircle: {
      name: 'seriesLabelFontSize',
      description: 'Nội dung tiêu đề.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '{a|Tổng phép}\n20 ngày' },
        category: 'ppx-chart',
        subcategory: 'optionInputGauge & optionInputPie',
      },
      control: {
        type: 'text',
      },
    },
    seriesDataValue: {
      name: 'seriesLabelFontSize',
      description: 'Nội dung tiêu đề.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 20 },
        category: 'ppx-chart',
        subcategory: 'optionInputGauge & optionInputPie',
      },
      control: {
        type: 'number',
      },
    },
    //optionInputPie
    tooltipTitle: {
      name: 'tooltipTitle',
      description: 'Tiêu đề của tooltip.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Thống kê phép' },
        category: 'ppx-chart',
        subcategory: 'optionInputPie',
      },
      control: {
        type: 'text',
      },
    },
    tooltipFormatter: {
      name: 'tooltipFormatter',
      description: 'Tiêu đề của tooltip.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '{a} <br/>{b}: {c} ngày' },
        category: 'ppx-chart',
        subcategory: 'optionInputPie',
      },
      control: {
        type: 'text',
      },
    },
    legendOrient: {
      name: 'legendOrient',
      defaultValue: 'vertical',
      description: 'Định hướng bố cục của chú giải.',
      table: {
        type: { summary: "'vertical' |'horizontal'" },
        defaultValue: { summary: 'vertical' },
        category: 'ppx-chart',
        subcategory: 'optionInputPie',
      },
      control: {
        type: 'select',
        options: ['vertical', 'horizontal'],
      },
    },
    legendBottom: {
      name: 'legendBottom',
      // defaultValue: 'vertical',
      description:
        'Khoảng cách giữa thành phần chú giải và mặt dưới cùng của vùng chứa.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 0 },
        category: 'ppx-chart',
        subcategory: 'optionInputPie',
      },
      control: {
        type: 'number',
        // options: ['vertical', 'horizontal'],
      },
    },
    legendFontSize : {
      name: 'legendFontSize',
      // defaultValue: 'vertical',
      description:
        'Kich thước font chữ của chú giải.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 16 },
        category: 'ppx-chart',
        subcategory: 'optionInputPie',
      },
      control: {
        type: 'number',
        // options: ['vertical', 'horizontal'],
      },
    },
    legendFormart: {
      name: 'legendFormart',
      description:
        'Truyền vào hàm xuất chuổi string.',
      table: {
        type: { summary: "()=>{ data.filter((row) => row.name === name)[0].value; } return name + ':' + ' ' + `{a|${value} ngày}`;' }"},
        // defaultValue: { summary: 16 },
        category: 'ppx-chart',
        subcategory: 'optionInputPie',
      },
      // control: {
      //   type: 'number',
      //   // options: ['vertical', 'horizontal'],
      // },
    },
    seriesBottom:{
      name: 'seriesBottom',
      description: 'Khoảng cách giữa thành phần chú giải và mặt dưới cùng của vùng chứa.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 100 },
        category: 'ppx-chart',
        subcategory: 'optionInputPie',
      },
      control: {
        type: 'number',
      },
    },
    seriesSizeCircle:{
      name: 'seriesSizeCircle',
      description: 'Kích thước của vòng tròn trung tâm.',
      table: {
        type: { summary: "'number'|'string'" },
        defaultValue: { summary: '55%' },
        category: 'ppx-chart',
        subcategory: 'optionInputPie',
      },
      // control: {
      //   type: 'number',
      // },
    },
    seriesColorCircle: {
      name: 'seriesSizeCircle',
      description: 'Màu của vòng tròn trung tâm.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#EBF2FB' },
        category: 'ppx-chart',
        subcategory: 'optionInputPie',
      },
      control: {
        type: 'text',
      },
    },
    seriesLabelFontSizeA: {
      name: 'seriesLabelFontSizeA',
      description: 'Kích thước tiêu đề khi format a|của vòng tròn trung tâm.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 20 },
        category: 'ppx-chart',
        subcategory: 'optionInputPie',
      },
      control: {
        type: 'number',
      },
    },
    seriesItemStyleBorderRadius: {
      name: 'seriesItemStyleBorderRadius',
      description: 'Border radius của viền tròn ngoài.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 50 },
        category: 'ppx-chart',
        subcategory: 'optionInputPie',
      },
      control: {
        type: 'number',
      },
    },
    seriesItemStyleBorderColor: {
      name: 'seriesItemStyleBorderColor',
      description: 'Color của viền tròn ngoài.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#fff' },
        category: 'ppx-chart',
        subcategory: 'optionInputPie',
      },
      control: {
        type: 'text',
      },
    },
    seriesItemStyleBorderWidth: {
      name: 'seriesItemStyleBorderWidth',
      description: 'Kích thước Width của viền tròn ngoài.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 10 },
        category: 'ppx-chart',
        subcategory: 'optionInputPie',
      },
      control: {
        type: 'number',
      },
    },
    seriesCircleBorder:{
      name: 'seriesCircleBorder',
      description: 'Kích thước Width của viền tròn ngoài.',
      table: {
        type: { summary: '(string | number)[]' },
        defaultValue: { summary: ['60%', '80%'] },
        category: 'ppx-chart',
        subcategory: 'optionInputPie',
      },
      // control: {
      //   type: 'number',
      // },
    },
    dataOption:{
      name: 'dataOption',
      description: 'Kích thước Width của viền tròn ngoài.',
      table: {
        type: { summary: 'object' },
        // defaultValue: { summary: ['60%', '80%'] },
        category: 'ppx-chart',
        subcategory: 'optionInputPie',
      },
      // control: {
      //   type: 'number',
      // },
    }

  },
} as Meta<ChartComponent>;

const Template: Story = (args) => ({
  props: args,
  template: `
      <ppx-chart [chartType]="chartType" [optionInputGauge]="optionInput"></ppx-chart>
      <p>chartFontFamily: string => Kiểu phông chữ tiêu đề.</p>
      <p>seriesTitleCircle: string => Nội dung tiêu đề</p>
      <p>seriesLabelLineHeight: number => Line height của tiêu đề </p>
      <p>seriesLabelFontSize: number => Kich thước tiêu đề</p>
      <p>seriesLabelColor: string => Màu của tiêu đề</p>
      <p>seriesDataValue: string => Giá trị của chart </p>
      <p>seriesMax: number => Giá trị lớn nhất của chart</p>
  `,
  // styles: [`p {font-size: 16px;}`,],
});

export const Gauge = Template.bind({});
Gauge.argTypes = {
  optionInput: {
    table: {
      disable: true
    },
  },
}
Gauge.args = {
  // option: {
  //   series: [
  //     {
  //       type: 'gauge',
  //       max: 20,
  //       startAngle:90,
  //       endAngle: -270,
  //       pointer: {
  //         show: false
  //       },
  //       progress: {
  //         show: true,
  //         overlap: false,
  //         roundCap: true,
  //         clip: false,
  //         itemStyle: {
  //           shadowBlur: 10,
  //           shadowColor: '#C6C7F8',
  //           color: {
  //           type: 'radial',
  //           x: 0.4,
  //           y: 0.3,
  //           r: 1,
  //           colorStops: [
  //             {
  //               offset: 0,
  //               color: '#8B7CF6'
  //             },
  //             {
  //               offset: 1,
  //               color: '#432EE1'
  //             }
  //           ]
  //         }
  //         }
  //       },
  //       axisLine: {
  //         lineStyle: {
  //           width: 20
  //         }
  //       },
  //       splitLine: {
  //         show: false,
  //       },
  //       axisTick: {
  //         show: false
  //       },
  //       axisLabel: {
  //         show: false,
  //         distance: 50
  //       },
  //       data: [
  //         {
  //           value: 10,
  //           detail: {
  //             valueAnimation: true,
  //             offsetCenter: ['0%', '5%']
  //           }
  //         },
  //       ],
  //       detail: {
  //         fontSize: 24,
  //         color: '#432EE1',
  //         borderRadius: 20,
  //         formatter: '{value} ngày đã dùng \n / 20 ngày',
  //         fontFamily:'Nunito',
  //       }
  //     }
  //   ]
  // }
  chartType: 'gauge',
  optionInput: {
    chartFontFamily: 'Nunito',
    seriesTitleCircle: '{value} ngày đã dùng \n / 20 ngày',
    seriesLabelLineHeight: 30,
    seriesLabelFontSize: 20,
    seriesLabelColor: '#6A5AE0',
    seriesDataValue: 10,
    seriesMax: 20,
  },
};

const Templates: Story = (args) => ({
  props: args,
  template: `
      <ppx-chart [chartType]="chartType" [optionInputPie]="optionInput"></ppx-chart>
      <p>chartFontFamily: string =>kiểu phông chữ tiêu đề.</p>
      <hr>
      <h1>Tooltip: </h1>
      <p>tooltipTitle: string => Tiêu đề của tooltip.</p>
      <p>tooltipFormatter: string =>Formatter tiêu đề của tooltip  a là tooltipTitle, b là name của data, c là value của data.</p>
      <hr>
      <h1>Legend: </h1>
      <p>legendOrient:  'vertical' | 'horizontal' => Định hướng bố cục của chú giải. Tùy chọn: vertical , horizontal.</p>
      <p>legendBottom: number => Khoảng cách giữa thành phần chú giải và mặt dưới cùng của vùng chứa. </p>
      <p>legendFontSize: number => Kich thước font chữ của chú giải.</p>
      <p>legendFormart: (name:string ): string => truyền vào hàm xuất chuổi string </p>
      <hr>
      <h1>Series: </h1>
      <p>seriesMax: number => Giá trị lớn nhất của chart</p>
      <p>seriesBottom: number => Khoảng cách giữa thành phần chú giải và mặt dưới cùng của vùng chứa. </p>
      <p>seriesSizeCircle: number|string => Kích thước của vòng tròn trung tâm.</p>
      <p>seriesColorCircle: string => Màu của vòng tròn trung tâm.</p>
      <p>seriesTitleCircle: string => Tiêu đề của vòng tròn trung tâm.</p>
      <p>seriesLabelFontSize: number => Kích thước tiêu đề của vòng tròn trung tâm.</p>
      <p>seriesLabelFontSizeA: number => Kích thước tiêu đề khi format a|của vòng tròn trung tâm.</p>
      <p>seriesItemStyleBorderRadius: number => Radius của viền tròn ngoài.</p>
      <p>seriesItemStyleBorderColor: string =>  Color của viền tròn ngoài.</p>
      <p>seriesItemStyleBorderWidth: number => Kích thước Width của viền tròn ngoài.</p>
      <p>seriesLabelColor: string => Màu của tiêu đề</p>
      <p>seriesLabelLineHeight: number => Line height của tiêu đề </p>
      <p>seriesCircleBorder: (string | number)[] => Kích thước Width của viền tròn ngoài.</p>
      <p>dataOption:object => Dữ liệu truyền vào</p>



  `,
  styles: [`hr {margin-bottom: 9px;} h1 {font-size: 20px;}`],
});
export const pie = Templates.bind({});
// pie.argTypes = {
//   optionInput: {
//     table: {
//       disable: true
//     },
//   },
// }
pie.args = {
  chartType: 'pie',
  optionInput: {
    chartFontFamily: 'Nunito',
    legendOrient: 'vertical',
    legendBottom: 0,
    legendFontSize: 16,
    seriesMax: 20,
    seriesBottom: 100,
    tooltipTitle: 'Thống kê phép',
    tooltipFormatter: '{a} <br/>{b}: {c} ngày',
    seriesSizeCircle: '55%',
    seriesLabelFontSize: 24,
    seriesLabelFontSizeA: 20,
    seriesLabelLineHeight: 30,
    seriesColorCircle: '#EBF2FB',
    seriesTitleCircle: `{a|Tổng phép}\n20 ngày`,
    seriesCircleBorder: ['60%', '80%'],
    seriesItemStyleBorderRadius: 50,
    seriesItemStyleBorderColor: '#fff',
    seriesItemStyleBorderWidth: 10,
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
  },
};

@Component({
  template: ` <div>Gauge chart</div>
    <ppx-chart
      [chartType]="chartTypeGauge"
      [optionInputGauge]="optionInputGauge"
    ></ppx-chart>
    <div>Pie chart</div>
    <ppx-chart
      [chartType]="chartTypePie"
      [optionInputPie]="optionInputPie"
    ></ppx-chart>`,
  styles: [
    `
      div {
        font-size: 25px;
        font-weight: bold;
      }
    `,
  ],
})
class LaunchComponent {
  data = [
    { value: 12, name: 'Theo LLĐ', itemStyle: { color: '#007AFF' } },
    { value: 1, name: 'Nhân viên lâu năm', itemStyle: { color: '#36CFC9' } },
    {
      value: 2,
      name: 'Năm trước chuyển sang',
      itemStyle: { color: '#FF3658' },
    },
    { value: 5, name: 'Quy đổi tăng ca', itemStyle: { color: '#FF9900' } },
  ];
  chartTypePie = 'pie';
  chartTypeGauge = 'gauge';
  optionInputGauge = {
    chartFontFamily: 'Nunito',
    seriesTitleCircle: '{value} ngày đã dùng \n / 20 ngày',
    seriesLabelLineHeight: 30,
    seriesLabelFontSize: 20,
    seriesLabelColor: '#6A5AE0',
    seriesDataValue: 12,
    seriesMax: 20,
  };
  optionInputPie = {
    chartFontFamily: 'Nunito',
    legendOrient: 'vertical',
    legendBottom: 0,
    legendFontSize: '16',
    seriesMax: 20,
    seriesBottom: 100,
    tooltipTitle: 'Thống kê phép',
    tooltipFormatter: '{a} <br/>{b}: {c} ngày',
    seriesSizeCircle: '55%',
    seriesLabelFontSize: 24,
    seriesLabelFontSizeA: 20,
    seriesLabelColor: '#6A5AE0',
    seriesLabelLineHeight: 30,
    seriesColorCircle: '#EBF2FB',
    seriesTitleCircle: `{a|Tổng phép}\n20 ngày`,
    seriesCircleBorder: ['60%', '80%'],
    seriesItemStyleBorderRadius: 50,
    seriesItemStyleBorderColor: '#fff',
    seriesItemStyleBorderWidth: 10,
    dataOption: this.data,
    legendFormart: (name: string) => {
      const value = this.data.filter((row) => row.name === name)[0].value;
      return name + ':' + ' ' + `{a|${value} ngày}`;
    },
  };
}
export const Overview = () => ({
  moduleMetadata: {
    imports: [ChartComponent],
    declarations: [LaunchComponent],
  },
  component: LaunchComponent,
});

import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts/core';
import { EChartsOption, GraphSeriesOption } from 'echarts';

interface NodeData {
  name: string;
  x: number;
  y: number;
}

interface LinkData {
  source: string;
  target: string;
}

@Component({
  selector: 'app-graph-simple-component',
  templateUrl: './graph-simple.component.html',
  styleUrls: ['./graph-simple.component.css'],
})
export class GraphSimpleComponent implements OnInit {
  options = {
    title: {
      text: 'Simple Graph',
    },
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        type: 'graph',
        layout: 'none',
        symbolSize: 20,
        roam: true,
        label: {
          normal: {
            show: true,
          },
        },
        edgeSymbol: ['circle', 'arrow'],
        edgeSymbolSize: [4, 10],
        edgeLabel: {
          normal: {
            textStyle: {
              fontSize: 10,
            },
          },
        },
        data: [
          // {
          //   name: 'Node 1',
          //   x: 0,
          //   y: 0,
          // },
          // {
          //   name: 'Node 2',
          //   x: 0,
          //   y: 0,
          // },
          // {
          //   name: 'Node 3',
          //   x: 550,
          //   y: 100,
          // },
          // {
          //   name: 'Node 4',
          //   x: 550,
          //   y: 500,
          // },
        ],
        links: [],
        // links: [
        //   {
        //     source: 0,
        //     target: 1,
        //     symbolSize: [5, 20],
        //     label: {
        //       normal: {
        //         show: true,
        //       },
        //     },
        //     lineStyle: {
        //       normal: {
        //         width: 5,
        //         curveness: 0.2,
        //       },
        //     },
        //   },
        //   {
        //     source: 'Node 2',
        //     target: 'Node 1',
        //     label: {
        //       normal: {
        //         show: true,
        //       },
        //     },
        //     lineStyle: {
        //       normal: { curveness: 0.2 },
        //     },
        //   },
        //   {
        //     source: 'Node 1',
        //     target: 'Node 3',
        //   },
        //   {
        //     source: 'Node 2',
        //     target: 'Node 3',
        //   },
        //   {
        //     source: 'Node 2',
        //     target: 'Node 4',
        //   },
        //   {
        //     source: 'Node 1',
        //     target: 'Node 4',
        //   },
        // ],
        lineStyle: {
          normal: {
            opacity: 0.9,
            width: 2,
            curveness: 0,
          },
        },
      },
    ],
  };

  ngOnInit(): void {
    const data = this.options.series[0].data as NodeData[];
    const links = this.options.series[0].links as LinkData[];
    for (let i = 1; i <= 5; i++) {
      if (i === 1) {
        data.push({ name: 'Node ' + i, x: 100, y: i * 100 });
        continue;
      }
      const name = 'Node ' + i;
      const nodeData: NodeData = { name, x: 200, y: i * 100 };
      data.push(nodeData);
      links.push({
        source: 'Node 1',
        target: name,
      });
    }
  }
}

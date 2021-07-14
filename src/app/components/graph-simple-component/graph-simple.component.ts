import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';

interface NodeData {
  id: number;
  name: string;
  x: number;
  y: number;
  isChildren: boolean;
  isExpanded: boolean;
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
  private chart: any;
  private expandedNodes: number[] = [];
  public options: any = {
    title: {
      text: 'Simple Graph',
    },
    tooltip: {},
    // animationDurationUpdate: 1500,
    // animationEasingUpdate: 'quinticInOut',
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
        data: [],
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
    this.options.series[0].data.push({ id: 1, name: 'Node ' + 1, x: 100, y: 100, isChildren: true, isExpanded: false });
  }

  public onChartClick(data: NodeData): void {
    console.log(data);
    if (data.isChildren) {
      data.isExpanded = !data.isExpanded;
      if (data.id === 1 && !data.isExpanded) {
        this.expandedNodes = [];
      } else {
        this.expandedNodes.push(data.id);
      }
    }

    this.updateGraph();
  }

  private updateGraph(): void {
    const nodeData: NodeData[] = [];
    if (this.expandedNodes.length === 0) {
      // this.options.series[0].data = [];
      // this.options.series[0].links = [];
      this.chart.setOption(this.options);
    } else {
      const data: NodeData[] = [];
      const links: LinkData[] = [];
      for (let i = 1; i <= 50; i++) {
        if (i === 1) {
          data.push({ id: i, name: 'Node ' + i, x: 100, y: i * 100, isChildren: true, isExpanded: false });
          continue;
        }
        const name = 'Node ' + i;
        const nodeData: NodeData = { id: i, name, x: 200, y: i * 100, isChildren: false, isExpanded: false };
        data.push(nodeData);
        links.push({
          source: 'Node 1',
          target: name,
        });
      }
      this.options.series[0].data = data;
      this.options.series[0].links = links;
      this.chart.setOption(this.options);
    }
  }

  public onInit(data: any): void {
    console.log('onInit', data);
    this.chart = data;
    this.updateGraph();
  }
}

import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DagreNodesOnlyLayout, Edge, Layout, Node } from '@swimlane/ngx-graph';
import * as shape from 'd3-shape';
import { Orientation } from './customDagreNodesOnly';
import { Employee, NodeData } from '../../model/employee';
import { max } from 'rxjs/operators';

@Component({
  selector: 'app-supplier-and-consumer',
  templateUrl: './supplier-and-consumer.component.html',
  styleUrls: ['./supplier-and-consumer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierAndConsumerComponent implements OnInit {
  @Input() employees: Employee[] = [];

  public nodes: Readonly<Node>[] = [];
  public links: Edge[] = [];
  public layoutSettings = {
    orientation: Orientation.LEFT_TO_RIGHT,
  };
  public curve: any = shape.curveLinear;
  public layout: Layout = new DagreNodesOnlyLayout();

  constructor() {}

  public ngOnInit(): void {
    this.createEmployees();
    this.nodes = this.getNodes(this.employees);
    this.links = this.getLinks(this.employees);
  }

  private getNodes(employees: Employee[]): Node[] {
    return employees.map((employee) => {
      return {
        id: employee.id,
        label: employee.name,
        data: {
          office: employee.office,
          role: employee.role,
          backgroundColor: employee.backgroundColor,
          isExpanded: false,
        } as NodeData,
      };
    });
  }

  private getLinks(employees: Employee[]): Edge[] {
    return employees
      .filter((employee) => !!employee.upperManagerId)
      .map((employee) => {
        return {
          source: employee.upperManagerId,
          target: employee.id,
          label: '',
        } as Edge;
      });
  }

  public getStyles(node: Node): any {
    return {
      'background-color': node.data.backgroundColor,
    };
  }

  public onLinkClick(data: any): void {
    console.log('data', data);
  }

  private createEmployees(): void {
    for (let i = 1; i <= 10; i++) {
      if (i === 1) {
        this.employees.push({
          id: i.toString(),
          name: 'Manager ' + i,
          office: 'Office ' + i,
          role: 'Manager',
          backgroundColor: '#dc143c',
        });
        continue;
      }
      this.employees.push({
        id: i.toString(),
        name: 'Employee ' + i,
        office: 'Office ' + i,
        role: 'Engineer',
        backgroundColor: '#00FFFF',
        upperManagerId: '1',
      });
    }

    const maxLength = this.employees.length + 10;

    for (let i = this.employees.length + 1; i <= maxLength; i++) {
      console.log('create empl2');
      this.employees.push({
        id: i.toString(),
        name: 'Employee ' + i,
        office: 'Office ' + i,
        role: 'Engineer',
        backgroundColor: '#00FFFF',
        upperManagerId: '2',
      });
    }
  }

  public onClickNode(data: Node): void {
    const nodeData: NodeData = data.data;
    nodeData.isExpanded = !nodeData.isExpanded;
    console.log('data', data);
    if (nodeData.isExpanded) {
      nodeData.backgroundColor = '#27ac34';
      // this.nodes = this.createNodes([
      //   {
      //     id: '1',
      //     name: 'Manager ' + 1,
      //     office: 'Office ' + 1,
      //     role: 'Manager',
      //     backgroundColor: '#dc143c',
      //   },
      // ]);
      this.links = [];
      this.nodes = [];
    } else {
      nodeData.backgroundColor = '#DC143C';
    }
  }
}

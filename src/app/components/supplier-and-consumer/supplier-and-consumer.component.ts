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
  public links: Readonly<Edge>[] = [];
  private expandedNodes: number[] = [];
  public layoutSettings = {
    orientation: Orientation.LEFT_TO_RIGHT,
  };
  public curve: any = shape.curveLinear;
  public layout: Layout = new DagreNodesOnlyLayout();

  constructor() {}

  public ngOnInit(): void {
    this.employees = this.getEmployees();
    this.changeGraph(this.employees, this.expandedNodes);
  }

  private getNodes(employees: Employee[], expandedNodes: number[]): Node[] {
    return employees.map((employee) => {
      const isExpanded: boolean = !!expandedNodes.find((id) => id === +employee.id);
      const childrens: number[] = employees
        .filter((empl) => empl.upperManagerId === employee.id)
        .map((empl) => +empl.id);
      return {
        id: employee.id,
        label: employee.name,
        data: {
          office: employee.office,
          role: employee.role,
          backgroundColor: employee.backgroundColor,
          isExpanded,
          childrens,
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

  private getEmployees(): Employee[] {
    const employees: Employee[] = [];
    for (let i = 1; i <= 10; i++) {
      if (i === 1) {
        employees.push({
          id: i.toString(),
          name: 'Manager ' + i,
          office: 'Office ' + i,
          role: 'Manager',
          backgroundColor: '#dc143c',
        });
        continue;
      }
      employees.push({
        id: i.toString(),
        name: 'Employee ' + i,
        office: 'Office ' + i,
        role: 'Engineer',
        backgroundColor: '#00FFFF',
        upperManagerId: '1',
      });
    }

    const maxLength = employees.length + 10;

    for (let i = employees.length + 1; i <= maxLength; i++) {
      console.log('create empl2');
      employees.push({
        id: i.toString(),
        name: 'Employee ' + i,
        office: 'Office ' + i,
        role: 'Engineer',
        backgroundColor: '#00FFFF',
        upperManagerId: '2',
      });
    }

    return employees;
  }

  public onClickNode(node: Node): void {
    const nodeData: NodeData = node.data;
    nodeData.isExpanded = !nodeData.isExpanded;
    console.log('data', node);
    if (nodeData.isExpanded) {
      this.expandedNodes = [...this.expandedNodes, +node.id];
    } else {
      const index = this.expandedNodes.indexOf(+node.id);
      if (index > -1) {
        this.expandedNodes.splice(index, 1);
      }
    }

    this.expandedNodes;
  }

  private changeGraph(employees: Employee[], expandedNodes: number[]): void {
    this.nodes = this.getNodes(employees, expandedNodes);
    this.links = this.getLinks(employees);
  }
}

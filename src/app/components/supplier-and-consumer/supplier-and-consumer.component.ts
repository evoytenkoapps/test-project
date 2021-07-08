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
    this.changeGraph();
  }

  private getNodes(): Node[] {
    if (this.expandedNodes.length === 0) {
      const employee = this.employees.find((empl) => empl.id === '1') as Employee;

      const childrens: number[] = this.employees
        .filter((empl) => empl.upperManagerId === employee.id)
        .map((empl) => +empl.id);

      return [
        {
          id: employee.id,
          label: employee.name,
          data: {
            office: employee.office,
            role: employee.role,
            backgroundColor: employee.backgroundColor,
            isExpanded: false,
            childrens,
          } as NodeData,
        },
      ];
    }
    const firstEmployee = this.employees.find((empl) => empl.id === '1') as Employee;

    const addEmployee: Employee[] = this.expandedNodes
      .map((expandedId) =>
        this.employees
          .filter((empl) => !!empl.upperManagerId)
          .filter((empl) => +(empl.upperManagerId as string) === expandedId)
      )
      .reduce((prev, next) => {
        return prev.concat(next);
      })
      .concat([firstEmployee]);

    return addEmployee.map((employee) => {
      const isExpanded: boolean = !!this.expandedNodes.find((id) => id === +employee.id);
      const childrens: number[] = this.employees
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

  private getLinks(): Edge[] {
    if (this.expandedNodes.length === 0) {
      return [];
    }
    const firstEmployee = this.employees.find((empl) => empl.id === '1') as Employee;

    return this.expandedNodes
      .map((expandedId) =>
        this.employees
          .filter((empl) => !!empl.upperManagerId)
          .filter((empl) => +(empl.upperManagerId as string) === expandedId)
      )
      .reduce((prev, next) => {
        return prev.concat(next);
      })
      .concat([firstEmployee])
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

    employees
      .filter((empl) => !!empl.upperManagerId)
      .forEach((subEmpl) => {
        for (let i = 1; i <= 10; i++) {
          console.log('create empl2');
          const id = ++employees.length;
          employees.push({
            id: id.toString(),
            name: 'Employee ' + id,
            office: 'Office ' + id,
            role: 'Engineer',
            backgroundColor: '#00FFFF',
            upperManagerId: subEmpl.id,
          });
        }
      });

    return employees;
  }

  public onClickNode(node: Node): void {
    const nodeData: NodeData = node.data;
    if (nodeData.childrens.length > 0) {
      nodeData.isExpanded = !nodeData.isExpanded;
      console.log('data', node);
      if (nodeData.isExpanded) {
        this.expandedNodes = [...this.expandedNodes, +node.id];
      } else {
        if (node.id === '1') {
          this.expandedNodes = [];
        } else {
          const index = this.expandedNodes.indexOf(+node.id);
          if (index > -1) {
            this.expandedNodes.splice(index, 1);
          }
        }
      }
      this.changeGraph();
    }
  }

  private changeGraph(): void {
    this.links = this.getLinks();
    this.nodes = this.getNodes();
  }
}

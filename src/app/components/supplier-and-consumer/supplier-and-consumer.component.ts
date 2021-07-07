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

  public nodes: Node[] = [];
  public links: Edge[] = [];
  public layoutSettings = {
    orientation: Orientation.LEFT_TO_RIGHT,
  };
  public curve: any = shape.curveLinear;
  public layout: Layout = new DagreNodesOnlyLayout();

  constructor() {
    this.createEmployee();
  }

  public ngOnInit(): void {
    for (const employee of this.employees) {
      const node: Node = {
        id: employee.id,
        label: employee.name,
        data: {
          office: employee.office,
          role: employee.role,
          backgroundColor: employee.backgroundColor,
          isExpanded: false,
        } as NodeData,
      };

      this.nodes.push(node);
    }

    for (const employee of this.employees) {
      if (!employee.upperManagerId) {
        continue;
      }

      const edge: Edge = {
        source: employee.upperManagerId,
        target: employee.id,
        label: '',
      };

      this.links.push(edge);
    }
  }

  public getStyles(node: Node): any {
    return {
      'background-color': node.data.backgroundColor,
    };
  }

  public onLinkClick(data: any): void {
    console.log('data', data);
  }

  private createEmployee(): void {
    for (let i = 1; i <= 10; i++) {
      if (i === 1) {
        this.employees.push({
          id: i.toString(),
          name: 'Manager ' + i,
          office: 'Office ' + i,
          role: 'Manager',
          backgroundColor: '#DC143C',
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
    data.data.isExpanded = !data.data.isExpanded;
    console.log(data.data.isExpanded);
  }
}

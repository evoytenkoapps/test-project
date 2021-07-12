export interface Employee {
  id: string;
  name: string;
  office: string;
  role: string;
  backgroundColor: string;
  upperManagerId?: string;
  downManagerId?: number;
}

export interface NodeData {
  office: string;
  role: string;
  backgroundColor: string;
  isExpanded: boolean;
  childrens: number[];
}

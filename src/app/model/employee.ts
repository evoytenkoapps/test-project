export interface Employee {
  id: string;
  name: string;
  office: string;
  role: string;
  backgroundColor: string;
  upperManagerId?: string;
}

export interface NodeData {
  office: string;
  role: string;
  backgroundColor: string;
  isExpanded: boolean;
}

import { DepartmentType } from "./departmentDef";

export class EmployeeDef {
  constructor(
    public id: number,
    public name: string,
    public salary: number,
    public department: DepartmentType
  ) {}
}

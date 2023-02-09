import { Employee } from "../../models/employee";
import { DepartmentType } from "./departmentDef";

export class EmployeeDef {
  constructor(
    public id: number,
    public name: string,
    public salary: number,
    public department: DepartmentType
  ) {}
}

export function simplifyEmployee(employee: Employee): EmployeeDef {
  const simplifiedEmployee = {
    id: employee.id,
    name: employee.name,
    salary: employee.salary,
    department: employee.department,
  };

  return simplifiedEmployee;
}

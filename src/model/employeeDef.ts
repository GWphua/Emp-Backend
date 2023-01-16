import { Employee } from "./employee";

export class EmployeeDef {
  constructor(
    public id: number,
    public name: string,
    public salary: number,
    public department: "HR" | "PS"
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

import { EmployeeDef } from "./employeeDef";

export class GetAllEmployeesResponse {
  constructor(public employees: EmployeeDef[]) {}
}

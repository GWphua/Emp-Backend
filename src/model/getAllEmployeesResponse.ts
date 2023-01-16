import { Employee } from "./employee";

export class GetAllEmployeesResponse {
  constructor(public employees: Employee[]) {}
}

export class EmployeeRequest {
  constructor(
    public name: string,
    public salary: number,
    public department: "HR" | "PS"
  ) {}
}

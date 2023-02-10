import { DepartmentType } from "./departmentDef";

export class UserRequest {
  constructor(
    public username: string,
    public password: string,
    public department: DepartmentType
  ) {}
}

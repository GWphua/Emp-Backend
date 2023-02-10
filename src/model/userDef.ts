import { DepartmentType } from "./departmentDef";

export class UserDef {
  constructor(
    public username: string,
    public password: string,
    public department: DepartmentType
  ) {}
}

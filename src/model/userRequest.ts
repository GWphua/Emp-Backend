import { DepartmentType } from "./departmentDef";

export class UserSignUpRequest {
  constructor(
    public username: string,
    public password: string,
    public department: DepartmentType
  ) {}
}

export class UserLogInRequest {
  constructor(public username: string, public password: string) {}
}

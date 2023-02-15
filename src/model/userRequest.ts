import { DepartmentType } from "./departmentDef";

export class UserSignUpRequest {
  constructor(
    public username: string,
    public password: string,
    public department: DepartmentType
  ) {}
}

export class UserLoginRequest {
  constructor(public username: string, public password: string) {}
}

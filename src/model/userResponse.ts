import { DepartmentType } from "./departmentDef";

export class UserSignUpResponse {
  constructor(public username: string, public department: DepartmentType) {}
}

export class UserLoginResponse {
  constructor(public username: string, public department: DepartmentType) {}
}

import { DepartmentType } from "./departmentDef";

export type UserJwtPayload = {
  username: string;
  department: DepartmentType;
};

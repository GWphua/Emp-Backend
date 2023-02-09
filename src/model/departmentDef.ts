import { Department } from "../../models/department";

export type DepartmentType = "HR" | "PS" | "ADMIN";

export class DepartmentDef {
  constructor(public department: DepartmentType) {}
}

export function simplifyDepartment(department: Department): DepartmentDef {
  const simplifiedDepartment = {
    department: department.department,
  };

  return simplifiedDepartment;
}

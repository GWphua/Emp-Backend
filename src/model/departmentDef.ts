export type DepartmentType = "HR" | "PS" | "ADMIN";

export class DepartmentDef {
  constructor(public id: number, public department: DepartmentType) {}
}
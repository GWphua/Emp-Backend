import _ from "express-session";
import { DepartmentType } from "./departmentDef";

declare module "express-session" {
  export interface SessionData {
    user: { username: string; department: DepartmentType };
    isAuthenticated: boolean;
  }
}

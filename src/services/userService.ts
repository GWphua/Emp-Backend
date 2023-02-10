import { User } from "../../models/user";
import { DepartmentType } from "../model/departmentDef";
import { getDepartmentId } from "./departmentService";

export async function createUserData(
  username: string,
  password: string,
  department: DepartmentType
): Promise<User | null> {
  const department_id = await getDepartmentId(department);
  if (department_id == null) {
    // But it cannot be null, since Joi validator checks for this.
    return null;
  }

  const payload = {
    username: username,
    password: password,
    department_id: department_id,
  };

  return await User.create(payload);
}

export async function getAllUserData(): Promise<User[]> {
  return await User.findAll({ order: [["id", "ASC"]] });
}

export async function getUserByDepartment(
  department: DepartmentType
): Promise<User[]> {
  const department_id = await getDepartmentId(department);
  if (department_id == null) {
    return [];
  }

  return await User.findAll({
    order: [["id", "ASC"]],
    where: { department_id: department_id },
  });
}

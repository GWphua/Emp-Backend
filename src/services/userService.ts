import { User } from "../../models/user";
import { DepartmentType } from "../model/departmentDef";
import { getDepartmentId } from "./departmentService";

export async function createUserData(
  username: string,
  password: string,
  department: DepartmentType
): Promise<User> {
  const department_id = await getDepartmentId(department);

  const createdUser = {
    username: username,
    password: password,
    department_id: department_id,
  };

  return await User.create(createdUser);
}

export async function getAllUserData(): Promise<User[]> {
  return await User.findAll({ order: [["id", "ASC"]] });
}

export async function getUserByDepartment(
  department: DepartmentType
): Promise<User[]> {
  const department_id = await getDepartmentId(department);

  return await User.findAll({
    order: [["id", "ASC"]],
    where: { department_id: department_id },
  });
}

export async function existingUserWithUsername(
  username: string
): Promise<User | null> {
  return await User.findOne({
    where: { username: username },
  });
}

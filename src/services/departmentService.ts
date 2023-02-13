import assert from "assert";
import { Department } from "../../models/department";
import { Employee } from "../../models/employee";
import { User } from "../../models/user";
import { DepartmentType } from "../model/departmentDef";
import { EmployeeDef } from "../model/employeeDef";
import { UserDef } from "../model/userDef";

export async function getAllDepartmentData(): Promise<Department[]> {
  return await Department.findAll({ order: [["id", "ASC"]] });
}

export async function getAllDepartment(): Promise<DepartmentType[]> {
  const departmentRows = await Department.findAll({
    order: [["id", "ASC"]],
  });

  return departmentRows.map((departmentRow) => departmentRow.department);
}

export async function getDepartmentId(
  department: DepartmentType
): Promise<number> {
  const departmentRow = await Department.findOne({
    where: { department: department },
  });

  assert(departmentRow != null);

  return departmentRow.id;
}

export async function getDepartment(
  department_id: number
): Promise<DepartmentType> {
  const departmentRow = await Department.findByPk(department_id);
  
  assert(departmentRow != null);

  return departmentRow.department;
}

export async function employeeWithDepartmentId(
  employee: EmployeeDef
): Promise<Employee> {
  const department_id = await getDepartmentId(employee.department);

  return {
    id: employee.id,
    name: employee.name,
    salary: employee.salary,
    department_id: department_id,
  } as Employee;
}

export async function employeeWithDepartment(
  employee: Employee
): Promise<EmployeeDef> {
  const department = await getDepartment(employee.department_id);

  return new EmployeeDef(
    employee.id,
    employee.name,
    employee.salary,
    department
  );
}

export async function userWithDepartmentId(user: UserDef): Promise<User> {
  const department_id = await getDepartmentId(user.department);

  return {
    username: user.username,
    password: user.password,
    department_id: department_id,
  } as User;
}

export async function userWithDepartment(user: User): Promise<UserDef> {
  const department = await getDepartment(user.department_id);

  return new UserDef(user.username, user.password, department);
}

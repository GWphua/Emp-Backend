import { Employee } from "../../models/employee";
import { Department } from "../../models/department";
import { DepartmentType } from "../model/departmentDef";

export async function createEmployeeData(
  name: string,
  salary: number,
  department: DepartmentType
): Promise<Employee> {
  const payload = { name: name, salary: salary, department: department };
  return await Employee.create(payload);
}

export async function getAllEmployeeData(): Promise<Employee[]> {
  return await Employee.findAll({ order: [["id", "ASC"]] });
}

export async function getAllDepartmentData(): Promise<Department[]> {
  return await Department.findAll({ order: [["id", "ASC"]] });
}

export async function getEmployeeData(
  emp_id: number
): Promise<Employee | null> {
  return await Employee.findByPk(emp_id);
}

export async function updateEmployeeData(
  emp_id: number,
  name: string,
  salary: number,
  department: DepartmentType
): Promise<Employee | null> {
  const isUpdated = await Employee.update(
    { name, salary, department },
    { where: { id: emp_id } }
  );

  if (isUpdated) {
    const updatedEmployee = {
      id: emp_id,
      name: name,
      salary: salary,
      department: department,
    } as Employee;

    return updatedEmployee;
  } else {
    return null;
  }
}

export async function deleteEmployeeData(emp_id: number): Promise<boolean> {
  return (await Employee.destroy({ where: { id: emp_id } })) ? true : false;
}

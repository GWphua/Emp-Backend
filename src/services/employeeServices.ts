import { Employee } from "../../models/employee";
import { DepartmentType } from "../model/departmentDef";
import { getDepartmentId } from "./departmentService";

export async function createEmployeeData(
  name: string,
  salary: number,
  department: DepartmentType
): Promise<Employee | null> {
  const department_id = await getDepartmentId(department);
  if (department_id == null) {
    // Or Assert non-null.
    return null;
  }

  const payload = { name: name, salary: salary, department_id: department_id };
  return await Employee.create(payload);
}

export async function getAllEmployeeData(): Promise<Employee[]> {
  return await Employee.findAll({ order: [["id", "ASC"]] });
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
  const department_id = await getDepartmentId(department);

  if (department_id == null) {
    return null;
  }

  const isUpdated = await Employee.update(
    { name, salary, department_id },
    { where: { id: emp_id } }
  );

  if (isUpdated) {
    const updatedEmployee = {
      id: emp_id,
      name: name,
      salary: salary,
      department_id: department_id,
    } as Employee;

    return updatedEmployee;
  } else {
    return null;
  }
}

export async function deleteEmployeeData(emp_id: number): Promise<boolean> {
  return (await Employee.destroy({ where: { id: emp_id } })) ? true : false;
}

import { Department } from "../../models/department";
import { Employee } from "../../models/employee";
import { DepartmentType } from "../model/departmentDef";
import { EmployeeDef } from "../model/employeeDef";

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
): Promise<number | null> {
  const departmentRow = await Department.findOne({
    where: { department: department },
  });

  return departmentRow == null ? null : departmentRow.id;
}

export async function getDepartment(
  department_id: number
): Promise<DepartmentType | null> {
  const departmentRow = await Department.findByPk(department_id);

  return departmentRow == null ? null : departmentRow.department;
}

export async function employeeWithDepartmentId(
  employee: EmployeeDef
): Promise<Employee | null> {
  const department_id = await getDepartmentId(employee.department);

  if (department_id == null) {
    return null;
  }

  return {
    id: employee.id,
    name: employee.name,
    salary: employee.salary,
    department_id: department_id,
  } as Employee;
}

export async function employeeWithDepartment(
  employee: Employee
): Promise<EmployeeDef | null> {
  const department = await getDepartment(employee.department_id);

  if (department == null) {
    return null;
  }

  return new EmployeeDef(
    employee.id,
    employee.name,
    employee.salary,
    department
  );
}

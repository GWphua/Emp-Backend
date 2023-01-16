import { RequestHandler } from "express";
import { EmployeeRequest } from "../model/employeeRequest";
import { ErrorResponse } from "../model/errorResponse";
import { GetAllEmployeesResponse } from "../model/getAllEmployeesResponse";
import { Employee } from "../model/employee";
import { EmployeeDef } from "../model/employeeDef";

const employees: EmployeeDef[] = [];
function getEmployeeIndex(id: number): number {
  return employees.findIndex((employee) => employee.id == id);
}

export const createEmployee: RequestHandler = async (req, res, next) => {
  const request = req.body as EmployeeRequest;

  const employee = await Employee.create(request as any);

  res.status(200).json(employee);
};

export const getAllEmployees: RequestHandler = async (req, res, next) => {
  const employees = await Employee.findAll();
  res.status(200).json(new GetAllEmployeesResponse(employees));
};

export const getEmployee: RequestHandler<{ emp_id: number }> = async (
  req,
  res,
  next
) => {
  const emp_id = req.params.emp_id;

  const employee = await Employee.findByPk(emp_id);

  if (employee == null) {
    res.status(404).json(new ErrorResponse("Employee not found."));
  } else {
    res.status(200).json(employee);
  }
};

export const updateEmployee: RequestHandler<{ emp_id: number }> = (
  req,
  res,
  next
) => {
  const emp_id = req.params.emp_id;
  const empIndex = getEmployeeIndex(emp_id);

  if (empIndex < 0) {
    res.status(404).json(new ErrorResponse("Employee not found."));
    return;
  }

  const updateRequest = req.body as EmployeeRequest;

  const updatedEmployee = new EmployeeDef(
    emp_id,
    updateRequest.name,
    updateRequest.salary,
    updateRequest.department
  );

  if (JSON.stringify(updatedEmployee) === JSON.stringify(employees[empIndex])) {
    res.status(304).json();
  } else {
    employees[empIndex] = updatedEmployee;
    res.status(200).json(updatedEmployee);
  }
};

export const deleteEmployee: RequestHandler<{ emp_id: number }> = (
  req,
  res,
  next
) => {
  const emp_id = req.params.emp_id;
  const empIndex = getEmployeeIndex(emp_id);

  if (empIndex < 0) {
    res.status(404).json(new ErrorResponse("Employee not found."));
  } else {
    employees.splice(empIndex, 1);
    res.status(204).json();
  }
};

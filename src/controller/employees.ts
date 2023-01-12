import { RequestHandler } from "express";
import { EmployeeDef } from "../model/employeeDef";
import { EmployeeRequest } from "../model/employeeRequest";
import { ErrorResponse } from "../model/errorResponse";
import { GetAllEmployeesResponse } from "../model/getAllEmployeesResponse";

const employees: EmployeeDef[] = [];
function getEmployeeIndex(id: number): number {
  return employees.findIndex((employee) => employee.id == id);
}

export const createEmployee: RequestHandler = (req, res, next) => {
  const request = req.body as EmployeeRequest;

  const employee = new EmployeeDef(
    Math.random(),
    request.name,
    request.salary,
    request.department
  );

  res.status(200).json(employee);
};

export const getAllEmployees: RequestHandler = (req, res, next) => {
  res.status(200).json(new GetAllEmployeesResponse(employees));
};

export const getEmployee: RequestHandler<{ emp_id: number }> = (
  req,
  res,
  next
) => {
  const emp_id = req.params.emp_id;
  const empIndex = getEmployeeIndex(emp_id);

  if (empIndex < 0) {
    res.status(404).json(new ErrorResponse("Error: Employee not found."));
  } else {
    res.status(200).json(employees[empIndex]);
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
    res.status(404).json(new ErrorResponse("Error: Employee not found."));
  } else {
    const updateRequest = req.body as EmployeeRequest;
    const updatedEmployee = new EmployeeDef(
      emp_id,
      updateRequest.name,
      updateRequest.salary,
      updateRequest.department
    );

    updatedEmployee == employees[empIndex]
      ? res.status(304)
      : res.status(200).json(updatedEmployee);
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
    res.status(404).json(new ErrorResponse("Error: Employee not found."));
  } else {
    employees.splice(empIndex, 1);
    res.status(204);
  }
};

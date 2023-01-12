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
  try {
    const request = req.body as EmployeeRequest;

    if (!request.isValidRequest()) {
      res
        .status(400)
        .json(new ErrorResponse("Please ensure fields are entered correctly"));
      return;
    }

    const employee = new EmployeeDef(
      Math.random(),
      request.name,
      request.salary,
      request.department
    );
    employees.push(employee);

    res.status(200).json(employee);
  } catch {
    res.status(500).json(new ErrorResponse("Server Error"));
  }
};

export const getAllEmployees: RequestHandler = (req, res, next) => {
  try {
    res.status(200).json(new GetAllEmployeesResponse(employees));
  } catch {
    res.status(500).json(new ErrorResponse("Server Error"));
  }
};

export const getEmployee: RequestHandler<{ emp_id: number }> = (
  req,
  res,
  next
) => {
  try {
    const emp_id = req.params.emp_id;
    const empIndex = getEmployeeIndex(emp_id);

    if (empIndex < 0) {
      res.status(404).json(new ErrorResponse("Employee not found."));
    } else {
      res.status(200).json(employees[empIndex]);
    }
  } catch {
    res.status(500).json(new ErrorResponse("Server Error"));
  }
};

export const updateEmployee: RequestHandler<{ emp_id: number }> = (
  req,
  res,
  next
) => {
  try {
    const emp_id = req.params.emp_id;
    const empIndex = getEmployeeIndex(emp_id);

    if (empIndex < 0) {
      res.status(404).json(new ErrorResponse("Employee not found."));
      return;
    }

    const updateRequest = req.body as EmployeeRequest;

    if (!updateRequest.isValidRequest()) {
      res
        .status(400)
        .json(new ErrorResponse("Please ensure fields are entered correctly"));
      return;
    }

    const updatedEmployee = new EmployeeDef(
      emp_id,
      updateRequest.name,
      updateRequest.salary,
      updateRequest.department
    );

    if (
      JSON.stringify(updatedEmployee) === JSON.stringify(employees[empIndex])
    ) {
      res.status(304).json();
    } else {
      employees[empIndex] = updatedEmployee;
      res.status(200).json(updatedEmployee);
    }
  } catch {
    res.status(500).json(new ErrorResponse("Server Error"));
  }
};

export const deleteEmployee: RequestHandler<{ emp_id: number }> = (
  req,
  res,
  next
) => {
  try {
    const emp_id = req.params.emp_id;
    const empIndex = getEmployeeIndex(emp_id);

    if (empIndex < 0) {
      res.status(404).json(new ErrorResponse("Employee not found."));
    } else {
      employees.splice(empIndex, 1);
      res.status(204).json();
    }
  } catch {
    res.status(500).json(new ErrorResponse("Server Error"));
  }
};

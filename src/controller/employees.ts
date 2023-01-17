import { RequestHandler } from "express";
import { simplifyEmployee } from "../model/employeeDef";
import { EmployeeRequest } from "../model/employeeRequest";
import { ErrorResponse } from "../model/errorResponse";
import { GetAllEmployeesResponse } from "../model/getAllEmployeesResponse";
import {
  createEmployeeData,
  deleteEmployeeData,
  getAllEmployeeData,
  getEmployeeData,
  updateEmployeeData,
} from "../services/employeeServices";

export const createEmployee: RequestHandler = async (req, res, next) => {
  const request = req.body as EmployeeRequest;
  const createdEmployee = await createEmployeeData(
    request.name,
    request.salary,
    request.department
  );

  res.status(200).json(simplifyEmployee(createdEmployee));
};

export const getAllEmployees: RequestHandler = async (req, res, next) => {
  const allEmployees = (await getAllEmployeeData()).map((employee) =>
    simplifyEmployee(employee)
  );
  res.status(200).json(new GetAllEmployeesResponse(allEmployees));
};

export const getEmployee: RequestHandler<{ emp_id: number }> = async (
  req,
  res,
  next
) => {
  const emp_id = req.params.emp_id;
  const employee = await getEmployeeData(emp_id);

  if (employee == null) {
    res.status(404).json(new ErrorResponse("Employee not found."));
  } else {
    res.status(200).json(simplifyEmployee(employee));
  }
};

export const updateEmployee: RequestHandler<{ emp_id: number }> = async (
  req,
  res,
  next
) => {
  const emp_id = req.params.emp_id;
  const employeeById = await getEmployeeData(emp_id);

  if (employeeById == null) {
    res.status(404).json(new ErrorResponse("Employee not found."));
    return;
  }

  const request = req.body as EmployeeRequest;

  const oldEmployee = simplifyEmployee(employeeById);
  const newEmployee = await updateEmployeeData(
    emp_id,
    request.name,
    request.salary,
    request.department
  ).then((employee) => (employee == null ? null : simplifyEmployee(employee)));

  if (JSON.stringify(oldEmployee) === JSON.stringify(newEmployee)) {
    res.status(304).json();
  } else {
    if (newEmployee != null) {
      res.status(200).json({
        id: emp_id,
        name: newEmployee.name,
        salary: newEmployee.salary,
        department: newEmployee.department,
      });
    } else {
      res.status(404).json(new ErrorResponse("Employee not found."));
    }
  }
};

export const deleteEmployee: RequestHandler<{ emp_id: number }> = async (
  req,
  res,
  next
) => {
  const emp_id = req.params.emp_id;

  if (await deleteEmployeeData(emp_id)) {
    res.status(204).json();
  } else {
    res.status(404).json(new ErrorResponse("Employee not found."));
  }
};

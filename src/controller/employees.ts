import { RequestHandler } from "express";
import { EmployeeRequest } from "../model/employeeRequest";
import { ErrorResponse } from "../model/errorResponse";
import { GetAllEmployeesResponse } from "../model/getAllEmployeesResponse";
import { Employee } from "../model/employee";

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

export const updateEmployee: RequestHandler<{ emp_id: number }> = async (
  req,
  res,
  next
) => {
  const emp_id = req.params.emp_id;

  const employee = await Employee.findByPk(emp_id);

  if (employee == null) {
    res.status(404).json(new ErrorResponse("Employee not found."));
    return;
  }

  const newParticulars = req.body as EmployeeRequest;
  const oldParticulars = {
    name: employee.name,
    salary: employee.salary,
    department: employee.department,
  } as EmployeeRequest;

  if (JSON.stringify(oldParticulars) === JSON.stringify(newParticulars)) {
    res.status(304).json();
  } else {
    await Employee.update(newParticulars, { where: { id: emp_id } });
    res.status(200).json(await Employee.findByPk(emp_id));
  }
};

export const deleteEmployee: RequestHandler<{ emp_id: number }> = async (
  req,
  res,
  next
) => {
  const emp_id = req.params.emp_id;

  if ((await Employee.destroy({ where: { id: emp_id } }))) {
    res.status(204).json();
  } else {
    res.status(404).json(new ErrorResponse("Employee not found."));
  }
};

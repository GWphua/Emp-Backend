import { RequestHandler } from "express";
import { Employee } from "../../models/employee";
import { EmployeeRequest } from "../model/employeeRequest";
import { ErrorResponse } from "../model/errorResponse";
import { GetAllEmployeesResponse } from "../model/getAllEmployeesResponse";
import { UserRequest } from "../model/RequestHandlerTypes";
import { employeeWithDepartment } from "../services/departmentService";
import {
  createEmployeeData,
  deleteEmployeeData,
  getAllEmployeeData,
  getAllEmployeeInDepartment,
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

  const employeeDef = await employeeWithDepartment(createdEmployee);
  res.status(200).json(employeeDef);
};

export const getAllEmployees: RequestHandler = async (
  req: UserRequest,
  res,
  next
) => {
  console.log(req.user);
  if (req.user == undefined) {
    return res.status(400).json(new ErrorResponse("Error with JWT Token"));
  }

  let databaseEmployees!: Employee[];
  if (req.user.department === "ADMIN") {
    databaseEmployees = await getAllEmployeeData();
  } else {
    databaseEmployees = await getAllEmployeeInDepartment(req.user!.department);
  }

  const employees = await Promise.all(
    databaseEmployees.map(
      async (databaseEmployee) => await employeeWithDepartment(databaseEmployee)
    )
  );

  res.status(200).json(new GetAllEmployeesResponse(employees));
};

export const getEmployee: RequestHandler<{ emp_id: string }> = async (
  req: UserRequest,
  res,
  next
) => {
  console.log(req.user);
  if (req.user == undefined) {
    return res.status(400).json(new ErrorResponse("Error with JWT Token"));
  }

  const emp_id = +req.params.emp_id;
  const employee = await getEmployeeData(emp_id);

  if (employee == null) {
    return res.status(404).json(new ErrorResponse("Employee not found."));
  }

  const employeeDef = await employeeWithDepartment(employee);
  if (
    req.user.department === "ADMIN" ||
    req.user.department === employeeDef.department
  ) {
    res.status(200).json(employeeDef);
  } else {
    res
      .status(404)
      .json(new ErrorResponse("Employee not found in department."));
  }
};

export const updateEmployee: RequestHandler<{ emp_id: string }> = async (
  req,
  res,
  next
) => {
  const emp_id = +req.params.emp_id;
  const oldEmployee = await getEmployeeData(emp_id);

  if (oldEmployee == null) {
    res.status(404).json(new ErrorResponse("Employee not found."));
    return;
  }

  const request = req.body as EmployeeRequest;

  const newEmployee = await updateEmployeeData(
    emp_id,
    request.name,    
    request.salary,
    request.department
  );

  if (newEmployee == null) {
    res.status(404).json(new ErrorResponse("Employee not found."));
    return;
  }

  const oldEmployeeDef = await employeeWithDepartment(oldEmployee);
  const newEmployeeDef = await employeeWithDepartment(newEmployee);

  if (JSON.stringify(oldEmployeeDef) == JSON.stringify(newEmployeeDef)) {
    res.status(304).json();
  } else {
    res.status(200).json(newEmployeeDef);
  }
};

export const deleteEmployee: RequestHandler<{ emp_id: string }> = async (
  req : UserRequest,
  res,
  next
) => {
  const emp_id = +req.params.emp_id;

  if (await deleteEmployeeData(emp_id)) {
    res.status(204).json();
  } else {
    res.status(404).json(new ErrorResponse("Employee not found."));
  }
};

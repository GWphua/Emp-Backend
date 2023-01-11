import { RequestHandler } from "express";
import { EmployeeDef } from "../model/employeeDef";
import { EmployeeRequest } from "../model/employeeRequest";

const employees: EmployeeDef[] = [];

export const createEmployee : RequestHandler<EmployeeRequest> = (req, res, next) => {
  const employeeRequest = req.body;

  // Use Math.Random for the ID.
  try {
    res.status(200).json(employeeRequest);
  }
  
};

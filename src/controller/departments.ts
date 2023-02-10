import { RequestHandler } from "express";
import { getAllDepartment } from "../services/departmentService";

export const getAllDepartments: RequestHandler = async (req, res, next) => {
  res.status(200).json(await getAllDepartment());
};

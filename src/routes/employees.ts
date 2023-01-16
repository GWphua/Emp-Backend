import { Router } from "express";
import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployee,
  updateEmployee,
} from "../controller/employees";
import { validateEmployeeRequest } from "../middleware/validation";

const router = Router();

router.get("/", getAllEmployees);
router.get("/:emp_id", getEmployee);
router.post("/", validateEmployeeRequest, createEmployee);
router.put("/:emp_id", validateEmployeeRequest, updateEmployee);
router.delete("/:emp_id", deleteEmployee);

export default router;

import { Router } from "express";
import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployee,
  updateEmployee,
} from "../controller/employees";
import {
  validateEmployeeId,
  validateEmployeeRequest,
} from "../middleware/validation";

const router = Router();

router.get("/", getAllEmployees);
router.get("/:emp_id", validateEmployeeId, getEmployee);
router.post("/", validateEmployeeRequest, createEmployee);
router.put(
  "/:emp_id",
  validateEmployeeId,
  validateEmployeeRequest,
  updateEmployee
);
router.delete("/:emp_id", validateEmployeeId, deleteEmployee);

export default router;

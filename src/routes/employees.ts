import { Router } from "express";
import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployee,
  updateEmployee,
} from "../controller/employees";
import { validityHandler } from "../middleware/validation";

const router = Router();

router.get("/", getAllEmployees);
router.get("/:emp_id", getEmployee);
router.post("/", validityHandler, createEmployee);
router.put("/:emp_id", validityHandler, updateEmployee);
router.delete("/:emp_id", deleteEmployee);

export default router;

import { Router } from "express";
import { getAllDepartments } from "../controller/departments";
import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployee,
  updateEmployee
} from "../controller/employees";
import { createUser, getAllUsers } from "../controller/users";
import {
  validateEmployeeId,
  validateEmployeeRequest
} from "../middleware/validation";

const router = Router();

router.get("/", getAllEmployees);
router.get("/department", getAllDepartments);
router.get("/users", getAllUsers);
router.get("/:emp_id", validateEmployeeId, getEmployee);

router.post("/", validateEmployeeRequest, createEmployee);
router.post("/users", createUser);

router.put(
  "/:emp_id",
  validateEmployeeId,
  validateEmployeeRequest,
  updateEmployee
);

router.delete("/:emp_id", validateEmployeeId, deleteEmployee);

export default router;

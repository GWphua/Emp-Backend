import { Router } from "express";
import { getAllDepartments } from "../controller/departments";
import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployee,
  updateEmployee
} from "../controller/employees";
import { signUp, getAllUsers, login } from "../controller/users";
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
router.post("/signup", signUp);
router.post("/login", login);

router.put(
  "/:emp_id",
  validateEmployeeId,
  validateEmployeeRequest,
  updateEmployee
);

router.delete("/:emp_id", validateEmployeeId, deleteEmployee);

export default router;

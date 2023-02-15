import { Router } from "express";
import { getAllDepartments } from "../controller/departments";
import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployee,
  updateEmployee,
} from "../controller/employees";
import { signup, getAllUsers, login, authorizeUser } from "../controller/users";
import {
  validateEmployeeId,
  validateEmployeeRequest,
  validateLoginRequest,
  validateSignupRequest,
} from "../middleware/validation";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.get("/", verifyToken, getAllEmployees);
router.get("/department", getAllDepartments);
router.get("/users", verifyToken, getAllUsers);
router.get("/:emp_id", verifyToken, validateEmployeeId, getEmployee);
router.get("/authorize", authorizeUser);

router.post("/", verifyToken, validateEmployeeRequest, createEmployee);
router.post("/signup", validateSignupRequest, signup);
router.post("/login", validateLoginRequest, login);

router.put(
  "/:emp_id",
  validateEmployeeId,
  validateEmployeeRequest,
  updateEmployee
);

router.delete("/:emp_id", validateEmployeeId, deleteEmployee);

export default router;

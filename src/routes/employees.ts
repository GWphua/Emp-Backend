import { Router } from "express";
import { createEmployee, deleteEmployee, getAllEmployees, getEmployee, updateEmployee } from "../controller/employees";

const router = Router();

router.get("/", getAllEmployees);
router.get("/:emp_id", getEmployee);
router.post("/", createEmployee);
router.put("/:emp_id", updateEmployee);
router.delete("/:emp_id", deleteEmployee);

export default router;

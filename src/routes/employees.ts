import { Router } from "express";
import { createEmployee } from "../controller/employees";

const router = Router();

// router.get("/employee");
router.post("/", createEmployee);
// router.get("/employee/:emp_id");
// router.put("/employee/:emp_id");
// router.delete("/employee/:emp_id");

export default router;

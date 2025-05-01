

import { Router } from "express";
import * as employeeServices from "./services/employee.services.js"
import { validation } from "../../middleware/validation.middleware.js";

import * as validators from "./employee.validation.js"

const router = Router();




router.post("/",validation(validators.createEmployeeValidation),employeeServices.createEmployee)
router.get("/", employeeServices.getAllEmployees);
router.get("/:empId",validation(validators.getEmployeeByIdValidation) ,employeeServices.getEmployeeById);
router.put("/:empId",validation(validators.updateEmployeeInfoValidation),employeeServices.updateEmployeeInfo)
router.delete("/:empId" , employeeServices.deleteEmployee)

















export default router;
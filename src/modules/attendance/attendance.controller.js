
import { Router } from "express";
import * as attendanceServices from "./services/attendance.services.js" 
import { validation } from "../../middleware/validation.middleware.js";
import * as validators from "./attendance.validation.js"
const router = Router();

router.post("/checkIn" ,validation(validators.checkInValidation), attendanceServices.checkInEmployee);
router.post("/checkOut",validation(validators.checkOutValidation),attendanceServices.checkOutEmployee)
router.get("/employee/:empId", validation(validators.getAttendanceByIdValidation),attendanceServices.getAttendanceById)
router.get("/today/:empId",validation(validators.getAttendanceOfTodayValidation), attendanceServices.getAttendanceOfToday)
router.get("/", attendanceServices.getAllAttendance)
router.get("/within-range",validation(validators.checkIfEmployeeWithinRangeValidation), attendanceServices.checkIfEmployeeWithinRange);
export default router;





import connectDB from "./DB/connection.js";
import organizationController from "./modules/organization/organization.controller.js"
import employeeController from "./modules/employee/employee.controller.js"
import attendanceController from "./modules/attendance/attendance.controller.js"
import path from "node:path";
import * as dotenv from "dotenv";
import { globalErrorHandling } from "./utils/response/error.response.js";
dotenv.config({ path: path.resolve("./src/config/.env.dev") });




const bootstrap = (app,express)=>{


app.use(express.json());
app.get('/', (req, res) => { res.send('Hello world!')});


app.use("/organization", organizationController);
app.use("/employee", employeeController);
app.use("/attendance", attendanceController)


   app.use("", (req, res, next) => {
     return res.status(404).json({ message: "In-valid routing" });
   });
 
  
   // global error handling
     app.use(globalErrorHandling);

   // database connection
connectDB()

}

export default bootstrap










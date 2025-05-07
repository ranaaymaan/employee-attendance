
import * as dbServices from "../../../DB/db.services.js";
import { organizationModel } from "../../../DB/models/organization.model.js";
import { asyncHandler } from "../../../utils/response/error.response.js";
import { employeeModel } from "../../../DB/models/employee.model.js";
import { attendanceModel } from "../../../DB/models/attendance.model.js";
import { successResponse } from "../../../utils/response/success.response.js";





export const checkInEmployee = asyncHandler(async(req,res,next)=>{
const {empId } = req.body;
const longitude = parseFloat(req.body.longitude);
const latitude = parseFloat(req.body.latitude);

const employee = await dbServices.findOne({
  model: employeeModel,
  filter: { _id: empId },
  populate: [
    {
      path: "organization", select:"name"
    },
  ],
});
if(!employee){
    return next (new Error("In-valid employee Id"),{cause:404})
}
const organization = await dbServices.findOne({
  model: organizationModel,
 
});
if(!organization){
    return next (new Error("In-valid organization Id"),{cause:404})
}
const empLocation = {
location:{
    $near:{
        $geometry:{
            type:"Point",
            coordinates:[longitude,latitude]
        },
        $maxDistance:100,
    },
},
};

// Check if the employee is within range of the organization

const empRange = await dbServices.findOne({
    model : organizationModel,
    filter:{
        _id:employee.organization,
        ...empLocation
        
    },
  
})


if(!empRange){
    return next (new Error("You are not within range of the organization"),{cause:404})
}




const attendance = await dbServices.create({
  model: attendanceModel,
  data: {
    employee: empId,
    organization: employee.organization,
    checkInLocation: {
      type: "Point",
      coordinates: [longitude, latitude],

    },
    checkInTime: Date.now(),
    checkOutLocation: null,
    checkOutTime: null,
  },
});

    

return successResponse({
    res,
    message:"Check in successfully",
    data:{attendance},
})


})


export const checkOutEmployee = asyncHandler(async(req,res,next)=>{
    const { empId} = req.body;
    const longitude = parseFloat(req.body.longitude);
    const latitude = parseFloat(req.body.latitude);

    const attendance = await dbServices.findOne({
   model:attendanceModel,
   filter:{
    employee:empId,
    checkOutTime:null,
   },

    })
    if(!attendance){
        return next (new Error("no active attendance found",{cause:404}))
    }

      const checkOutTime = Date.now();
      const durationMs =
        checkOutTime - new Date(attendance.checkInTime);
      const durationTime = parseFloat(
        (durationMs / (1000 * 60 )).toFixed(2)
      );

    const checkOut = await dbServices.findOneAndUpdate({
      model: attendanceModel,
      filter: {
        _id: attendance._id,
      },
      data: {
        checkOutTime,
        checkOutLocation: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
        status: "checkedOut",
       workDurationMinutes: durationTime,
      },
      populate:[
     {path:"employee", select:"name"}, 
    {path:"organization" , select:"name"}

   ],
      options: {
        new: true,
      },
    });

    
    


    return successResponse({
        res,
        message:"checkOut successfully",
        data:{checkOut},
    })

})


export const getAttendanceById = asyncHandler(async(req,res,next)=>{
const {empId} = req.params;

const attendance = await dbServices.findAll({
  model: attendanceModel,
  filter: {
    employee: empId,
  },
  populate: [
    { path: "employee", select: "name" },
    { path: "organization", select: "name" },
  ],
    options: {
        sort: { checkInTime: -1 },
    },
});

 if (!attendance.length) {
   return next(new Error("No attendance records found"), { cause: 404 });
 }

console.log(attendance);

 return successResponse({
   res,
   message: "Attendance records retrieved successfully",
   data: attendance,
 });


})


export const getAttendanceOfToday = asyncHandler(async(req,res,next)=>{
const {empId} = req.params;

const today = new Date();
const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(),23, 59, 59, 999);


const attendance = await dbServices.findOne({
    model: attendanceModel,
    filter:{
        employee: empId,
        checkInTime: {
            $gte: startOfDay,
            $lt: endOfDay,
        },
   
    },
      populate: [
    { path: "employee", select: "name" },
    { path: "organization", select: "name" },
  ],
})
  if (!attendance) {
    return next(new Error("No attendance record found for today"), { cause: 404 });
  }



  return successResponse({
    res,
    message: "Today's attendance retrieved successfully",
    data: attendance.toObject(),
  });
});


export const getAllAttendance = asyncHandler(async(req,res,next)=>{
    const attendance = await dbServices.findAll({
      model: attendanceModel,
      filter: {},
      populate: [
        { path: "employee", select: "name" },
        { path: "organization", select: "name" },
      ],
        options: {
            sort: { createdAt : -1 },
        },
    });
    if (!attendance.length) {
      return next(new Error("No attendance records found"), { cause: 404 });
    }

   

    return successResponse({
res,
message: "All Attendance records retrieved successfully",
data: attendance,


    })
})


export const checkIfEmployeeWithinRange = asyncHandler(async(req,res,next)=>
{
    const {lat , lng , employeeId} = req.query;
    if(!lat || !lng || !employeeId){
        return next(new Error("Please provide lat , lng and employeeId"),{cause:400})
    }


    const employee = await dbServices.findOne({
        model : employeeModel,
        filter : {_id:employeeId}
    })
    if(!employee){
        return next(new Error("In-valid employee Id"),{cause:404})
    }

const empLocation = {
  location: {
    $near: {
      $geometry: {
        type: "Point",
        coordinates: [parseInt(lng), parseInt(lat)],
      },
      $maxDistance: 100,
    },
  },
};

const empRange = await dbServices.findOne({
  model: organizationModel,
  filter: {
    _id: employee.organization,
    ...empLocation,
  },
});

const isWithinRange = !!empRange; 

  
  

  return successResponse({
    res,
    message: "Employee range checked",
    data: { isWithinRange },
  });

    



})









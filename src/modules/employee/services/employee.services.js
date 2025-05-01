import { asyncHandler } from "../../../utils/response/error.response.js";

import * as dbServices from "../../../DB/db.services.js"
import { organizationModel } from "../../../DB/models/organization.model.js";
import { employeeModel } from "../../../DB/models/employee.model.js";
import { successResponse } from "../../../utils/response/success.response.js";

export const createEmployee = asyncHandler(async(req,res,next)=>{

    const{name,email,phone,organizationId}=req.body;

if(await dbServices.findOne({
    model:employeeModel,
    filter:{email}
})){
 return next(new Error("Email already exist", { cause: 409 }));
}

    const organization = await dbServices.findOne({
        model : organizationModel,
        filter : {_id:organizationId},

     
    })
    if(!organization){
        return next(new Error("In-valid organization Id"),{cause:404})
    }

    const employee = await dbServices.create({
        model : employeeModel,
        data:{
            name,
            email,
            phone,
            organization:organizationId,
        }
    })
    return successResponse({
        res,
        message:"employee created",
        status:201,
        data:{employee}
    })

    
})


export const getAllEmployees = asyncHandler(async(req,res,next)=>{

    const employees = await dbServices.findAll({
        model:employeeModel,
        filter:{},
        populate:[{path:"organization",select:"name"}],
            

    })
    return successResponse({
        res,
        data:{employees}
    })

})

export const getEmployeeById = asyncHandler(async(req,res,next)=>{
    const{empId} =  req.params
    const employee = await dbServices.findOne({
      model: employeeModel,
      filter: { _id: empId },
      populate: [{ path: "organization", select: "name" }],
    });
    if(!employee){
        return next(new Error("In-valid employee Id"),{cause:404})
    }
    return successResponse({
        res,
        data:{employee}
    
})
})


export const updateEmployeeInfo = asyncHandler(async(req,res,next)=>{
 const updatedData = req.body

    if(req.body.email){
       return next(new Error("Email can't be updated"),{cause:400})
    };
    if(req.body.organizationId){
        const organization = await dbServices.findOne({
            model : organizationModel,
            filter : {_id:req.body.organizationId}
        })
        if(!organization){
            return next(new Error("In-valid organization Id"),{cause:404})
        }
    };
  if(!await dbServices.findOne({
        model:employeeModel,
        filter:{_id:req.params.empId}
    })){
        {
            return next(new Error("In-valid employee Id"),{cause:404})
        }

  }
        
const employee = await dbServices.findByIdAndUpdate({
    model : employeeModel,
    id:req.params.empId,
    data:updatedData,
    options:{
        new:true
    }
})
return successResponse({
    res,
    message:"employee updated successfully",
    data:{employee}
})

})

export const deleteEmployee = asyncHandler(async(req,res,next)=>{

    const employee = await dbServices.findByIdAndDelete({
        model:employeeModel,
        id:req.params.empId
    })
    if(!employee){
        return next(new Error("In-valid employee Id"),{cause:404})
    }
    return successResponse({
        res,
        message:"employee deleted successfully",
    
    })
})




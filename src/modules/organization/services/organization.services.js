
import { asyncHandler } from "../../../utils/response/error.response.js";

import * as dbServices from "../../../DB/db.services.js";
import { organizationModel } from "../../../DB/models/organization.model.js";
import { successResponse } from "../../../utils/response/success.response.js";

export const createOrganization = asyncHandler(async (req, res, next) => {
  const { name, longitude, latitude } = req.body;

    const existingOrganization = await dbServices.findOne({
        model: organizationModel,
        filter: { name },
    });
    if (existingOrganization) {
        return next(new Error("Organization already exists", { cause: 409 }))};
  const existingOrganizationByLocation = await dbServices.findOne({
    model: organizationModel,
    filter: {
      "location.coordinates": [parseFloat(longitude), parseFloat(latitude)],
    },
  });

  if (existingOrganizationByLocation) {
    return next(
      new Error("Organization location already exists", { cause: 409 })
    );
  }



  const organization = await dbServices.create({
    model: organizationModel,
    data: {
      name,
      location: {
        type: "Point",
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      },
    },
  });

  return successResponse({
    res,
    message: "organization created",
    status: 201,
    data: { organization },
  });
});



export const getAllOrganization = asyncHandler(async(req, res, next)=>{

const organizations = await dbServices.findAll({
    model : organizationModel,
    filter:{},
    select : " name location ",
  
})
return successResponse({
    res,
    data:{organizations}
})
  
})

export const getOrganizationById = asyncHandler(async(req,res,next)=>{
    const {orgId}=req.params
    const organization = await dbServices.findOne({
        model: organizationModel,
        filter:{_id:orgId},
        select:"name location"
    });
    if(!organization){
        return next(new Error ("In-valid organization Id"),{cause:404})
    }
    return successResponse({
        res,
        data:{organization}
    })
});

export const updateOrganizationData = asyncHandler(async(req,res,next)=>{

const{name , longitude, latitude}= req.body;

const organization = await dbServices.findByIdAndUpdate({
    model : organizationModel,
 id:req.params.orgId,
    data:{
        name,
        location:{
            type:"Point",
            coordinates:[parseFloat(longitude),parseFloat(latitude)]
        }
    },
    select:"name location",
    options:{new:true}
});

if(!organization){
    return next (new Error ("In-valid organization Id"))
}
return successResponse({
    res,
    message:"organization updated successfully",
    status:201,
        data:{organization}
})

})

export const deleteOrganization = asyncHandler(async(req,res,next)=>{

    const organization = await dbServices.findByIdAndDelete({
        model : organizationModel,
        id:req.params.orgId,
    })
    if (!organization) {
      return next(new Error("In-valid organization Id"));
    }
    return successResponse({
        res,
        message: "organization deleted"
})
    
    }
)


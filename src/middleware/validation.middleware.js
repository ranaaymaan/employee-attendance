
import Joi from 'joi';
import { Types } from 'mongoose';


const checkObjectId = (value,helper)=>{
  return Types.ObjectId.isValid(value) ? true : helper.message("In-valid objectId ")
}


export const generalFields = {
  name: Joi.string().min(2).max(25).trim(),
  email: Joi.string().email({
    tlds: { allow: ["com", "net"] },
    minDomainSegments: 2,
    maxDomainSegments: 3,
  }),
  id: Joi.string().custom(checkObjectId),
  phone: Joi.string().pattern(new RegExp(/^01[0-9]{9}$/)),
  latitude: Joi.number().min(-90).max(90),
  longitude: Joi.number().min(-180).max(180),
};


export const validation=(Schema) =>{
return (req,res,next)=>{

const inputData={...req.body,...req.params,...req.query}


    const validationResult = Schema.validate(inputData,{abortEarly:true})
    if(validationResult.error){
        return res.status(400).json({message:"validation error",details:validationResult.error})
    }
    return next()
}
}




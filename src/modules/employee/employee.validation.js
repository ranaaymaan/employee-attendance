

import Joi from "joi";
import { generalFields } from "../../middleware/validation.middleware.js";
import { json } from "express";




export const createEmployeeValidation = Joi.object().keys({
name:generalFields.name.required(),
email:generalFields.email.required(),
phone:generalFields.phone.required(),
organizationId:generalFields.id.required()

}).required()


export const getEmployeeByIdValidation =Joi.object().keys({
    empId:generalFields.id.required()
}).required()


export const updateEmployeeInfoValidation = Joi.object()
  .keys({
    empId: generalFields.id.required(),
    name: generalFields.name.required(),
    phone: generalFields.phone.required(),
    organizationId: generalFields.id.required(),
  })
  .required();



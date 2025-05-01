

import Joi from "joi";
import { generalFields } from "../../middleware/validation.middleware.js";



export const checkInValidation  = Joi.object().keys({
empId : generalFields.id.required(),
longitude: generalFields.longitude.required(),
latitude: generalFields.latitude.required(),

}).required();


export const checkOutValidation = Joi.object()
  .keys({
    empId: generalFields.id.required(),
    longitude: generalFields.longitude.required(),
    latitude: generalFields.latitude.required(),
  })
  .required();


  export const getAttendanceByIdValidation = Joi.object()
    .keys({
      empId: generalFields.id.required(),
    })
    .required();

    
  export const getAttendanceOfTodayValidation = Joi.object()
    .keys({
      empId: generalFields.id.required(),
    })
    .required();

    export const checkIfEmployeeWithinRangeValidation = Joi.object()
      .keys({
        employeeId: generalFields.id.required(),
        lng: generalFields.longitude.required(),
        lat: generalFields.latitude.required(),
      })
      .required();

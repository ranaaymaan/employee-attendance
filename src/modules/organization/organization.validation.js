
import Joi from "joi";

import { generalFields } from "../../middleware/validation.middleware.js";

export const createOrganizationValidation = Joi.object().keys({
name:generalFields.name.required(),
longitude:generalFields.longitude.required(),
latitude:generalFields.latitude.required()

}).required()

export const getOrganizationByIdValidation = Joi.object().keys({
    orgId: generalFields.id.required()
}).required()


export const updateOrganizationValidation = Joi.object()
  .keys({
    name: generalFields.name.required(),
    longitude: generalFields.longitude.required(),
    latitude: generalFields.latitude.required(),
    orgId: generalFields.id.required(),
  })
  .required();



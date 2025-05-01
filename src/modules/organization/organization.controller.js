



import { Router } from "express";
import * as organizationServices from "./services/organization.services.js"

import { validation } from "../../middleware/validation.middleware.js";
import * as validators from "./organization.validation.js"



const router = Router();

router.post("/",validation(validators.createOrganizationValidation), organizationServices.createOrganization);
router.get("/", organizationServices.getAllOrganization);
router.get("/:orgId" , validation(validators.getOrganizationByIdValidation),organizationServices.getOrganizationById);
router.put("/:orgId", validation(validators.updateOrganizationValidation),organizationServices.updateOrganizationData);
router.delete("/:orgId", organizationServices.deleteOrganization);





export default router



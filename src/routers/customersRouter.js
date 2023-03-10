import { Router } from "express";
import { getCustomerById, getCustomersList, updateCustomer, addNewCustomer } from "../controllers/customersController.js";
import { validationSchema } from "../middlewares/validationSchema.js";
import { customerSchema } from "../schemas/customerSchema.js";

const customerRouter = Router()

customerRouter.get("/customers", getCustomersList)
customerRouter.get("/customers/:id?", getCustomerById)
customerRouter.post("/customers", validationSchema(customerSchema), addNewCustomer)
customerRouter.put("/customers/:id?", validationSchema(customerSchema), updateCustomer)

export default customerRouter
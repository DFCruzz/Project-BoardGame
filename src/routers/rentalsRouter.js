import { Router } from "express";
import { getRentals, rentGame } from "../controllers/rentalsController.js";
import { validationSchema } from "../middlewares/validationSchema.js";
import { rentalSchema } from "../schemas/rentalSchema.js";

const rentalsRoute = Router()

rentalsRoute.get("/rentals", getRentals)
rentalsRoute.post("/rentals", validationSchema(rentalSchema), rentGame)


export default rentalsRoute
import { Router } from "express";
import { deleteRent, finishRent, getRentals, rentGame } from "../controllers/rentalsController.js";
import { validationSchema } from "../middlewares/validationSchema.js";
import { rentalSchema } from "../schemas/rentalSchema.js";

const rentalsRoute = Router()

rentalsRoute.get("/rentals", getRentals)
rentalsRoute.post("/rentals", validationSchema(rentalSchema), rentGame)
rentalsRoute.post("/rentals/:id/return", finishRent)
rentalsRoute.delete("/rentals/:id", deleteRent)


export default rentalsRoute
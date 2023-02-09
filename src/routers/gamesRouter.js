import { Router } from "express";
import { getGamesList, addNewGame } from "../controllers/gamesController.js";
import { validationSchema } from "../middlewares/validationSchema.js";
import { gameSchema } from "../schemas/gameSchema.js";

const gamesRouter = Router()

gamesRouter.get("/games", getGamesList)
gamesRouter.post("/games", validationSchema(gameSchema), addNewGame)

export default gamesRouter
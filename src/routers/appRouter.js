import { Router } from "express";
import gamesRouter from "./gamesRouter.js";
import customerRouter from "./customersRouter.js";
import rentalsRoute from "./rentalsRouter.js";

const router = Router()

router.use(gamesRouter)
router.use(customerRouter)
router.use(rentalsRoute)

export default router
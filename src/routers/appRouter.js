import { Router } from "express";
import gamesRouter from "./gamesRouter.js";
import customerRouter from "./customersRouter.js";

const router = Router()

router.use(gamesRouter)
router.use(customerRouter)

export default router
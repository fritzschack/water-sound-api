import { Router } from "express"
import recordingsRoutes from "./recording.router.js"

const router = Router()

router.use("/recordings", recordingsRoutes)

export default router
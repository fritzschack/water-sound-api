import { Router } from "express"
import recordingsRoutes from "./recordings.js"

const router = Router()

router.get("/", (req, res) => {
  return res.status(200).json({ message: "This is the water sound API" })
})

router.use("/recordings", recordingsRoutes)

export default router
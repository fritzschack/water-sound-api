import { Router } from "express"

import {
  recordings_index,
  recordings_create
} from "../controllers/recording.controller.js"

const router = Router()

router.get("/", recordings_index)
router.post("/", recordings_create)

export default router
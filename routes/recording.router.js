import { Router } from "express"

import { recordings_index, recordings_create, recordings_delete } from "../controllers/recording.controller.js"

const router = Router()

router.get("/", recordings_index)
router.post("/", recordings_create)
router.delete("/:id", recordings_delete)

export default router

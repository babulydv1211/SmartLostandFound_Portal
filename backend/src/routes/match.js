import { Router } from "express"
import { authGuard } from "../middleware/auth.js"
import { callMatchEndpoint } from "../services/aiClient.js"

const router = Router()

router.post("/match", authGuard, async (req, res, next) => {
  try {
    const { lostItem, foundItem } = req.body
    const response = await callMatchEndpoint(lostItem, foundItem)
    res.json(response)
  } catch (error) {
    next(error)
  }
})

export default router

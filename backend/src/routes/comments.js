import { Router } from "express"
import Comment from "../models/Comment.js"
import { authGuard } from "../middleware/auth.js"

const router = Router()

router.get("/comments", authGuard, async (_req, res, next) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 }).lean()
    res.json({ comments })
  } catch (error) {
    next(error)
  }
})

router.post("/comments", authGuard, async (req, res, next) => {
  try {
    const { studentName, message, course } = req.body
    if (!studentName || !message || !course) {
      return res.status(400).json({ message: "All fields required" })
    }
    const comment = await Comment.create({ studentName, message, course })
    res.status(201).json({ comment })
  } catch (error) {
    next(error)
  }
})

export default router

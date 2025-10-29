import { Router } from "express"
import Item from "../models/Item.js"
import { authGuard } from "../middleware/auth.js"
import { callMatchService } from "../services/aiClient.js"
import { sendMatchEmail } from "../services/mailer.js"

import Match from "../models/Match.js"

const router = Router()

router.get("/items", authGuard, async (_req, res, next) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 }).lean()
    res.json({ items })
  } catch (error) {
    next(error)
  }
})

router.post("/lost", authGuard, async (req, res, next) => {
  try {
    const { title, description, location, occurredAt, image } = req.body
    const record = await Item.create({
      type: "lost",
      title,
      description,
      location,
      occurredAt,
      image,
      reporterName: req.user.name ?? "Student",
      reporterEmail: req.user.email,
    })

    const confidence = await handleMatch(record)
    res.status(201).json({ item: record, confidence })
  } catch (error) {
    next(error)
  }
})

router.post("/found", authGuard, async (req, res, next) => {
  try {
    const { title, description, location, occurredAt, image } = req.body
    const record = await Item.create({
      type: "found",
      title,
      description,
      location,
      occurredAt,
      image,
      reporterName: req.user.name ?? "Student",
      reporterEmail: req.user.email,
    })

    const confidence = await handleMatch(record)
    res.status(201).json({ item: record, confidence })
  } catch (error) {
    next(error)
  }
})

async function handleMatch(record) {
  try {
    const { score, counterpart } = await callMatchService(record)
    if (score >= 80 && counterpart) {
      await Item.findByIdAndUpdate(record._id, { matchConfidence: score })
      await Item.findByIdAndUpdate(counterpart._id, { matchConfidence: score })

      //some change

     // Create a Match document if it doesn't exist
  const existingMatch = await Match.findOne({
    $or: [
      { lostItem: record._id, foundItem: counterpart._id },
      { lostItem: counterpart._id, foundItem: record._id }
    ]
  })
  if (!existingMatch) {
    if (record.type === "lost") {
      await Match.create({
        lostItem: record._id,
        foundItem: counterpart._id,
        confidence: score,
      })
    } else {
      await Match.create({
        lostItem: counterpart._id,
        foundItem: record._id,
        confidence: score,
      })
    }
  }

 //some change yha tak


      await sendMatchEmail({
        score,
        lostItem: record.type === "lost" ? record : counterpart,
        foundItem: record.type === "found" ? record : counterpart,
      })
    }
    return score
  } catch (error) {
    console.warn("Match service unavailable:", error.message)
    return null
  }
}

export default router

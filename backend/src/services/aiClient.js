import axios from "axios"
import Item from "../models/Item.js"

const AIML_SERVICE_URL = process.env.AIML_SERVICE_URL ?? "https://babul1211-aiml-service.hf.space"

export async function callMatchService(record) {
  const counterpartType = record.type === "lost" ? "found" : "lost"
  const counterpartItems = await Item.find({ type: counterpartType }).lean()

  if (!counterpartItems.length) {
    return { score: null, counterpart: null }
  }

  const { data } = await axios.post(`${AIML_SERVICE_URL}/batch-match`, {
    item: sanitizeItem(record),
    candidates: counterpartItems.map(sanitizeItem),
  })

  if (!data?.bestMatch) {
    return { score: null, counterpart: null }
  }

  const counterpart = counterpartItems.find((item) => item._id.toString() === data.bestMatch.id)
  return {
    score: data.bestMatch.score,
    counterpart,
  }
}

export async function callMatchEndpoint(lostItem, foundItem) {
  const { data } = await axios.post(`${AIML_SERVICE_URL}/match`, {
    lost_item: lostItem,
    found_item: foundItem,
  })
  return data
}

function sanitizeItem(item) {
  return {
    id: item._id.toString(),
    type: item.type,
    title: item.title,
    description: item.description,
    location: item.location,
    occurredAt: item.occurredAt,
    image: item.image,
  }
}
